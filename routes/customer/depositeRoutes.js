const controller = require("../../controllers/customers/depositeController");
const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.get("/transaction-history/:id", handleFormData, controller.getCustomerDeposite);

module.exports = router;
