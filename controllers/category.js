import Category from '../model/category';
import formidable from 'formidable';
import _ from 'lodash';

//Add Product
export const create = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
        if(err){
            return res.status(400).json({
                error: "Thêm sản phẩm k thành công"
            })
        }
        const { name} = fields;
        if(!name){
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ thông tin"
            })
        }
        let category = new Category(fields);
        category.save((err, data) => {
            if(err){
                return res.status(400).json({
                    error:"Không thêm được sản phẩm"
                })
            }
            res.json(data)
        })
    });
}
// //List Products
// export const list = (req, res)=>{
//     Product.find((err, data) =>{
//         if(err){
//             error:"Không tìm thấy sản phẩm"
//         }
//         res.json({data})
//     })
// }
// //Product Detail
// export const productById = (req, res, next, id) => {
//     Product.findById(id).exec((err, product) => {
//         if(err || !product) {
//         res.status(400).json({
//                 error: "Không tìm thấy sản phẩm"
//             })
//         }
//         req.product = product;
//         next();
//     })
// }
// export const read = (req, res) =>{
//     return res.json(req.product);
// }
// //Delete Product
// export const remove = (req, res) =>{
//     let product = req.product;
//     product.remove((err, deleteProduct) => {
//         if(err){
//             return res.status(400).json({
//                 error: "Không xóa được sản phẩm"
//             })
//         }
//         res.json({
//             deleteProduct,
//             message:"Sản phẩm đã được xóa thành công"
//         })
//     })
// }
// //Update Product
// export const update = (req, res) =>{
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//         if(err){
//             return res.status(400).json({
//                 error: "Sửa sản phẩm k thành công"
//             })
//         }
//         const { name, description,price} = fields;
//         if(!name || !description || !price){
//             return res.status(400).json({
//                 error: "Bạn cần nhập đầy đủ thông tin"
//             })
//         }
//         // let product = new Product(fields);
//         let product = req.product;
//         product = _.assignIn(product, fields);
//         if(files.photo){
//             if(files.photo.size > 1000000){
//                 return res.status(400).json({
//                     error:"Kích thước ảnh không vượt quá 1MB"
//                 })                
//             }
//             product.photo.data = fs.readFileSync(files.photo.path);
//             product.photo.contentType = files.photo.path;
//         }
//         // console.log(product);
//         product.save((err, data) => {
//             if(err){
//                 return res.status(400).json({
//                     error:"Không sửa được sản phẩm"
//                 })
//             }
//             res.json(data)
//         })
//     });
// }
