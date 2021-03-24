import mongoose from 'mongoose';

const productSchema =mongoose.Schema({
    name: {
        type: String,
        trim:true,
        maxLength:32,
        required: true
    },
    description:{
        type: String,
        required: true,
        maxLength:2000
    },
    price: {
        type: Number,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    quantity: {
        type: Number
    },
    shipping: {
        required: true,
        type:Boolean
    },
    sold:{
        type:Number,
        default:0
    }
    

},{timeStamps:true});
module.exports =mongoose.model("Product",productSchema)