const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("zaaaab" , token);
    jwt.verify(token, "TunRW_Funcheta_Studio_komos_nikos");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
