import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv';
import productRoutes from './routes/product';
import categoryRoutes from './routes/category';
import newsRoutes from './routes/news';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
//middle
dotenv.config();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
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
app.use('/api',newsRoutes);
// app.use(morgan('dev'));

const port = process.env.PORT || 8000

app.listen(port, () => {{console.log('Server is running on port',port)} })
