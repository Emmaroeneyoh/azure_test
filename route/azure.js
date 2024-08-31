const { usercreateaddressController, usertestapiController } = require("../app/controller/azure");

const router = require("express").Router();


router.get('/api/notifications', usercreateaddressController);
router.post("/api/notifications", usercreateaddressController);
router.get("/test", usertestapiController);

module.exports = router;
