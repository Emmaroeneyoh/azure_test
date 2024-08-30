const { usercreateaddressController, usertestapiController } = require("../app/controller/azure");

const router = require("express").Router();

router.post("/api/notifications", usercreateaddressController);
router.get("/test", usertestapiController);

module.exports = router;
