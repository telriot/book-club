module.exports = {
  asyncErrorHandler: fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  },
  isProfileOwner: async (req, res, next) => {
    try {
      if (req.user._id.equals(req.params.id)) {
        return next()
      }
    } catch (error) {
      console.log("Wrong permission profile")
      res.json("Wrong permission profile")
    }
  }
}
