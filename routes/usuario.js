
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();

router.post('/add', auth.verifyAdministrador, usuarioController.add);
router.get('/query', auth.verifyUsuario, usuarioController.query);
router.get('/list', auth.verifyUsuario, usuarioController.list);
router.put('/update', auth.verifyAdministrador, usuarioController.update);
router.delete('/remove', auth.verifyAdministrador, usuarioController.remove);
router.put('/activate', auth.verifyAdministrador, usuarioController.activate);
router.put('/deactivate', auth.verifyAdministrador, usuarioController.deactivate);
router.get('/describe', auth.verifyUsuario, usuarioController.describe);

router.post('/login',  usuarioController.login);

router.get('/listRoles', usuarioController.listRoles);
router.get('/listTypeDocumento', auth.verifyUsuario, usuarioController.listTypeDocumento);
router.get('/listTypeRoles', auth.verifyUsuario, usuarioController.listTypeRoles);

module.exports = router;