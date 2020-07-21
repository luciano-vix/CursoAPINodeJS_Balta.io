const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

// conecta no banco
mongoose.connect('mongodb+srv://manovei:291121@cluster0-mzrtc.gcp.mongodb.net/test',{ useNewUrlParser: true });

// Carrega os models
const Product = require('./models/product');

// Carregar as rotas
const indexRouter = require('./routes/index-router');
const productRouter = require('./routes/product-route');

app.use('/', indexRouter);
app.use('/products', productRouter);

module.exports = app;