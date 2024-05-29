const jwt = require("jsonwebtoken");


const authenticateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(
      token,
      "majorauth" //hide token
    );
    req.user = {
      userId: decodedToken.id,
      role: decodedToken.role,
    };
    next();
  } catch (error) {
    res.status(401).send({ message: "Authentication failed!" });
  }
};
module.exports = {
  authenticateJWT,
};
