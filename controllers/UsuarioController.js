var bcrypt = require('bcryptjs');
const models = require('../models');
const token = require('../services/token');
const permisos = require('./permisos.json');


module.exports = {
    login: async (req, res, next) => {
        try {
            let user = await models.Usuario.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);

                if (match) {
                   
                    let tokenReturn = await token.encode(user.id, user.rol, user.nombre, user.email,permisos[user.rol]);
                    res.status(200).json({
                        user,
                        tokenReturn
                    });
                } else {
                    res.status(401).send({
                        auth: false,
                        accessToken: null,
                        reason: "Invalid Password!"
                    });
                }
            } else {
                res.status(404).send({
                    message: 'User Not Found.'
                });
            }
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    add: async (req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    query: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findOne({
                id: req.query.id
            });
            if (!reg) {
                res.status(404).send({
                    message: 'User Not Found.'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Usuario.findAll();
            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            let pas = req.body.password;
            const reg0 = await models.Usuario.findOne({
                where: {
                    id: req.body.id
                }
            });
            if (pas != reg0.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg = await models.Usuario.update(req.body, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndDelete({
                id: req.body.id
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = await models.Usuario.update({
                estado: 1
            }, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.Usuario.update({
                estado: 0
            }, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error -> ' + e
            });
            next(e);
        }
    }
}