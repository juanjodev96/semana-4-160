
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();

router.post('/login', usuarioController.login);

router.get('/list', auth.verifyUsuario, usuarioController.list);
router.get('/query', auth.verifyUsuario, usuarioController.query);

router.post('/add', auth.verifyUsuario, usuarioController.add);

router.put('/update', auth.verifyUsuario, usuarioController.update);
router.put('/deactivate', auth.verifyUsuario, usuarioController.deactivate);
router.put('/activate', auth.verifyUsuario, usuarioController.activate);

router.delete('/remove', auth.verifyUsuario, usuarioController.remove);
module.exports = router;