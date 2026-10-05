const jwt = require("jsonwebtoken")

const adminOnly = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json("Not authenticated!")
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403).json("Invalid token!")

    if (user.role !== "admin") {
      return res.status(403).json("Access denied! Admin only")
    }

    req.user = user
    next()
  })
}

module.exports = adminOnly