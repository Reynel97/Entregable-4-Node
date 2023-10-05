const { Router } = require('express');
const { createConversationMessage, getConversationMessages } = require('./messages.controller');
const authenticate = require('../../middlewares/auth.middleware');

const router = Router();

router.route('/conversation/:id')
  .post(authenticate,createConversationMessage)
  .get(authenticate, getConversationMessages)




  module.exports = router