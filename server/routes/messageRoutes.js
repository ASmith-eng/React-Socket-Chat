const router = require("express").Router();
const { addMessage, getAllMessages } = require("../controllers/messageController");

router.post("/addmessage/", addMessage);
router.post("/getmessages/", getAllMessages);

module.exports = router;