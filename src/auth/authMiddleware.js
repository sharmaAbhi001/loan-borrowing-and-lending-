const { validateToken } = require("./authorization");

const checkForAuthenticationCookie = (cookieName) => {
  return (req, res, next) => {
   
     const token = req.cookies[cookieName];

    if (!token) {
      return next();
      
    }
    try {
      req.user = validateToken(token);
    } catch (error) {
      return res.status(401).error("Token validation error:", error.message);
    }
    return next();
  };
};

module.exports = checkForAuthenticationCookie;
