const  jwt  = require("jsonwebtoken");

function userMiddleware(req, res, next) {
  const token = req.headers.token; 
  console.log("Received token:", token);

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    req.userId = decodedToken.id; 
    next(); 
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token"}); 
  }
}

module.exports = { userMiddleware };
