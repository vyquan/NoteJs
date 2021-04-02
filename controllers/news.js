import News from '../model/news';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

//Add news
export const create = (req,res) =>{
    //khởi tạo formidable
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    //sử dụng
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Thêm sản phẩm k thành công"
            })
        }       
        const { name, description,price,category} = fields;
        if(!name || !description || !price || !category){
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ thông tin"
            })
        }
        let news = new News(fields);
        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error:"Kích thước ảnh không vượt quá 1MB"
                })                
            }
            //thành công gán giá trị vào model
            news.photo.data = fs.readFileSync(files.photo.path); //đọc file ảnh và gán vào path
            news.photo.contentType = files.photo.path;
        }
        // console.log(news);
        //thêm vào db
        news.save((err, data) => {
            if(err){
                return res.status(400).json({
                    error:"Không thêm được sản phẩm"
                })
            }
            res.json(data)
        })
    });
}
//List newss
export const list = (req, res)=>{
    // news.find((err, data) =>{
    //     if(err){
    //         error:"Không tìm thấy sản phẩm"
    //     }
    //     res.json({data})
    // })
    News.find()
    .select("-photo")
    // .populate('category')
    // .sort([[order, sortBy]])
    // .limit(limit)
    .exec((err,data) =>{
        if(err){
            res.status(400).json({
                error: "news not found"
            })
        }
        res.json(data)
    })
}
//news Detail
export const newsById = (req, res, next, id) => {
    //nhận id
    News.findById(id).exec((err, news) => {
        if(err || !news) {
        res.status(400).json({
                error: "Không tìm thấy sản phẩm"
            })
        }
        req.news = news;
        next();
    })
}
export const read = (req, res) =>{
    return res.json(req.news);
}
//Delete news
export const remove = (req, res) =>{
    let news = req.news;
    news.remove((err, deletenews) => {
        if(err){
            return res.status(400).json({
                error: "Không xóa được sản phẩm"
            })
        }
        res.json({
            deletenews,
            message:"Sản phẩm đã được xóa thành công"
        })
    })
}
//Update news
export const update = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Sửa sản phẩm k thành công"
            })
        }
        const { name, description,price,category} = fields;
        if(!name || !description || !price || !category){
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ thông tin"
            })
        }
        // let news = new news(fields);
        let news = req.news;
        news = _.assignIn(news, fields);
        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error:"Kích thước ảnh không vượt quá 1MB"
                })                
            }
            news.photo.data = fs.readFileSync(files.photo.path);
            news.photo.contentType = files.photo.path;
        }
        // console.log(news);
        news.save((err, data) => {
            if(err){
                return res.status(400).json({
                    error:"Không sửa được sản phẩm"
                })
            }
            res.json(data)
        })
    });
}
