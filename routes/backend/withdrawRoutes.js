const controller = require("../../controllers/backend/withdrawController");
const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.get("/transaction-history-withdraw", handleFormData, controller.getCustomerWithdraw);
router.post("/withdraw-amount/:id", handleFormData, controller.withdraw);

module.exports = router;
