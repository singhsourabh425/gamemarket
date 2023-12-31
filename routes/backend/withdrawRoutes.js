const controller = require("../../controllers/backend/withdrawController");
const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.get("/transaction-history-withdraw", handleFormData, controller.getCustomerWithdraw);
router.post("/withdraw/:id", handleFormData, controller.withdrawStatus);
router.post("/update-withdraw/:id", handleFormData, controller.updateStatus);
router.get("/pending-amount", handleFormData, controller.getPendingWithdraw);

module.exports = router;
