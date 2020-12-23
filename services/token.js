var jwt = require('jsonwebtoken');
const models = require('../models');

async function checkToken(token) {
    let id = null;
    try {
        const {
            id
        } = await jwt.decode(token);
        id = id;
    } catch (e) {
        return false;
    }
    
    const user = await models.Usuario.findOne({
        where: {
            id: id,
            estado: 1
        }
    });
    if (user) {
        const token = jwt.sign({
            id: id
        }, 'secretKeyToGenerateToken', {
            expiresIn: '1d'
        });
        return {
            token,
            rol: user.rol
        };
    } else {
        return false;
    }
}

module.exports = {

    //generar el token
    encode: async (id, rol,nombre,email) => {
        
        const token = jwt.sign({
            id: id,
            rol: rol,
            nombre: nombre,
            email: email
        }, 'secretKeyToGenerateToken', {
            expiresIn: '1d'
        });
        return token;
    },
    
    decode: async (token) => {
        try {
            const {
                id
            } = await jwt.verify(token, 'secretKeyToGenerateToken');
            const user = await models.Usuario.findOne({
                where: {
                    id: id
                }
            });
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }

    }
}