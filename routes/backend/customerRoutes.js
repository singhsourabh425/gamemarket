const controller = require("../../controllers/backend/customerController");
const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");
router.post("/add-amount/:id", handleFormData, controller.addAmountCustomer);
router.get("/all", handleFormData, controller.getAll);
module.exports = router;
