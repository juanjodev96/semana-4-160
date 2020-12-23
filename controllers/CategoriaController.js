const models = require('../models');

module.exports = {
    add: async (req, res, next) => {
        try {
            const reg = await models.Categoria.create(req.body);
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
            const reg = await models.Categoria.findOne({
                where: {
                    id: req.query.id
                }
            });
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
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
            const reg = await models.Categoria.findAll();
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
            const reg = await models.Categoria.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
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
    activate: async (req, res, next) => {
        try {
            
            const reg = await models.Categoria.update({
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
            const reg = await models.Categoria.update({
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
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.Categoria.destroy({
                where: {
                    _id: req.body.id
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