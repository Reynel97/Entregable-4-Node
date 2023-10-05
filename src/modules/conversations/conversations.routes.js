const {Router} = require('express');
const { createConversation, createGroupConversation, getAllConversations} = require('./conversations.controllers.js');
const authenticate = require('../../middlewares/auth.middleware.js');

const router = Router();

//crear una conversation
//crear conversaciones grupales
//obtener todas las conversaciones
//obtener una conversacion con todos los mesajes

router.post('/',authenticate, createConversation);
router.post('/group', authenticate, createGroupConversation)
router.get('/:id',authenticate, getAllConversations)


module.exports = router
