const router = require("express").Router();
const { addMessage, getAllMessages, getUserOnlineStatus } = require("../controllers/messageController");

router.post("/addmessage/", addMessage);
router.post("/getmessages/", getAllMessages);
router.post("/getonlinestatus", getUserOnlineStatus);

module.exports = router;