const controller = require('../../controllers/backend/bidController')

const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.get('/:id', handleFormData, controller.get)

module.exports = router;