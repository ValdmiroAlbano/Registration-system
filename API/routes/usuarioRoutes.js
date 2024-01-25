const express = require('express');
const UsuarioController = require('../controllers/usuarioControllers');
const router = express.Router();
const usuarioController = new UsuarioController();
const usuarioPath = '/usuarios';

// public route
router.post('/usuarios/login', usuarioController.loginUsuario.bind(usuarioController));
router.post('/usuarios/cadastro', usuarioController.criarUsuario.bind(usuarioController));


//privete route
router.get('/usuarios/lista', usuarioController.listarUsuario.bind(usuarioController));
router.put(`${usuarioPath}/:id`, usuarioController.atualizarUsuario.bind(usuarioController));
router.delete(`${usuarioPath}/:id`, usuarioController.excluirUsuario.bind(usuarioController));

module.exports = router;
