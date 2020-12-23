
const routerx = require('express-promise-router');
const articuloController = require('../controllers/ArticuloController');
const auth = require('../middlewares/auth');

const router = routerx();

router.get('/list', articuloController.list);
router.get('/listByCategorias', articuloController.listByCategorias);

router.post('/add', auth.verifyUsuario, articuloController.add);
router.get('/query', auth.verifyUsuario, articuloController.query);
router.get('/queryCodigo', auth.verifyUsuario, articuloController.queryCodigo);
router.put('/update', auth.verifyUsuario, articuloController.update);
router.delete('/remove', auth.verifyAdministrador, articuloController.remove);
router.put('/activate', auth.verifyUsuario, articuloController.activate);
router.put('/deactivate', auth.verifyUsuario, articuloController.deactivate);

module.exports = router;