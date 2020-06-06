const express = require("express")
var router = express.Router()
const { asyncErrorHandler } = require("../middleware")
const {
  sendRequest,
  getRequests,
  acceptRequest,
  declineRequest,
} = require("../controllers/requests")

router.get("/:username", asyncErrorHandler(getRequests))
router.post("/", asyncErrorHandler(sendRequest))
router.post("/accept", asyncErrorHandler(acceptRequest))
router.post("/decline", asyncErrorHandler(declineRequest))
module.exports = router
