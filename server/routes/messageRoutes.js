const router = require("express").Router();
const { addMessage, getAllMessages } = require("../controllers/messageController");

router.post("/addmessage/", addMessage);
router.post("/getallmessages/", getAllMessages);

module.exports = router;