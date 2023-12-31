const controller = require("../../controllers/backend/depositeController");
const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.get("/transaction-history", handleFormData, controller.getCustomerDeposite);

module.exports = router;
