import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv';
import productRoutes from './routes/product';
import categoryRoutes from './routes/category';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
//middle
dotenv.config();
app.use(morgan('dev'));
app.use(bodyParser.json());

//Connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(()=>{
    console.log(`Database connected`)
});
mongoose.connection.on('Error', err =>{
    console.log(`Data connect failed, ${err.message}`);
})
// Routes
app.use('/api',productRoutes);
app.use('/api',categoryRoutes);
// app.use(morgan('dev'));

const port = process.env.PORT || 8000

app.listen(port, () => {{console.log('Server is running on port',port)} })

// import mongose from 'mongose'

// mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             createIndex: true
// }).then(() => console.log('DB Connected'))

// mongoose.connection.on('error', err => {     
//             console.log(`DB connection error: ${err.message}` )
// })