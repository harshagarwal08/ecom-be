const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/products', productRouter);
app.use('/users', userRouter);

app.listen('8080', ()=>{
    console.log('running on port 8080');
}); 

