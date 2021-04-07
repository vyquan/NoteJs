const User = require('../model/user');
// import User from '../model/user'
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorsHandler');

export const signup = (req,res)=>{
    console.log("request body", req.body);
    const user = new User(req.body);
    user.save((error, user)=>{
        if(error){
            return res.status(400).json({
                error:"Không thể thêm"
            })
        }
        user.salt = undefined
        // user.hashed_password = undefined
        res.json({user})
    })
}
exports.signin = (req, res) => {
    // Tìm người dùng qua email
    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }
        // nếu người dùng được tìm thấy, hãy đảm bảo email và mật khẩu khớp nhau
        // tạo phương thức xác thực trong mô hình người dùng
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email và password không khớp'
            })
        }
        // tạo mã thông báo đã ký với id người dùng và bí mật
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // duy trì mã thông báo là 't' trong cookie với  
        res.cookie('t', token, { expire: new Date() + 9999 });
        // trả về phản hồi với người dùng và mã thông báo cho ứng dụng khách giao diện người dùng
        const { _id, name, email, role } = user;
        return res.json(
            {
                token, user: { _id, email, name, role }
            }
        )
    })
};
exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Đăng xuất thành công'
    })
}
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Không thể truy cập"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            error: "Admin resource! Truy cập bị từ chối"
        })
    }
    next();
}