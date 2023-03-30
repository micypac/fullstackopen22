const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  console.log(authorization);

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    console.log("*****Inside tokenExtractor IF");
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (err) {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = { tokenExtractor };
