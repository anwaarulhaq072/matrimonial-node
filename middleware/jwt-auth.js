var jwt = require("jsonwebtoken");

exports.checkAuth = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; //Seperating Bearer token
    console.log("Token => ", token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token => ", decodedToken);
    req.tokenData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      login: false,
      message: "Invalid or Expired Token",
      error: error.message,
    });
  }
};
