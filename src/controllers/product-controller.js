'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const validationContract = require('../validators/validator.js');
const respository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try {
        var data = await respository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({message: 'Falha ao processar sua requisição'})
    }
};

exports.getBySlug = (req, res, next) => {
    respository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });

};

exports.getById = (req, res, next) => {
    respository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });

};

exports.getByTag = (req, res, next) => {
    respository.getByTag(req.params.tag)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });

};

exports.post = (req, res, next) => {
    let contract = new validationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter no mínimo 3 caracteres.');
    contract.hasMinLen(req.body.slug, 5, 'O slug deve conter no mínimo 3 caracteres.');
    contract.hasMinLen(req.body.description, 10, 'A descrição deve conter no mínimo 3 caracteres.');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    respository.create(req.body)
        .then(x => {
            res.status(201).send({ message: 'Produto cadasatrado com sucesso!' });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    respository.update(req.params.id, req.body)
        .then(x => {
            res.status(200).send({ message: 'Produto atualizado com sucesso!' });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar o produto',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    respository.delete(req.body.id)
        .then(x => {
            res.status(200).send({ message: 'Produto removido com sucesso!' });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto',
                data: e
            });
        });
};
