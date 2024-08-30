const { usercreateaddressController } = require("../app/controller/azure");

const router = require("express").Router();

router.post("/api/notifications", usercreateaddressController);

module.exports = router;
