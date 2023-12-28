const controller = require('../../controllers/customers/upiDetailsController')

const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.post('/add-account/:id', handleFormData, controller.addAccount)
router.post('/update/:id', handleFormData, controller.updateAccount)

module.exports = router;