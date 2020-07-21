'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    const res = await Product.find({ 
        active: true
     }, 'title price slug');
     
    return res;
};

exports.getBySlug = (slug) => {
    return Product
        .findOne({
            slug: slug, //req.params.slug,
            active: true
        }, 'title description price slug tags')
};

exports.getById = (id) => {
    return Product
        .findById(id);
};


exports.getByTag = (tag) => {
    return Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags')
};

exports.create = (data) => {
    var product = new Product(data);

    product.title = data.title;
    product.slug = data.slug;
    product.description = data.description;
    product.price = data.price;
    product.active = data.active;
    product.tags = data.tags;

    return product.save();
}

exports.update = (id, data) => {
    return Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        })
}

exports.delete = (id) => {
    return Product
        .findByIdAndRemove(id);
}