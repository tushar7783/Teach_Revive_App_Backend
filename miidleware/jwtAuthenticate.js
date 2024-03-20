const { tokenVerification } = require("../services/authentication");

class TOKEN {
  async authentiate(req, res, next) {
    const bearerHearder = req.headers["authorization"];
    if (typeof bearerHearder != "undefined") {
      try {
        const bearer = bearerHearder.split(" ");
        const token = bearer[1];
        const decode = await tokenVerification(token);
        req.user = decode;
        next();
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Your token expired" });
      }
    } else {
      return res
        .send(404)
        .json({ message: "A Token is reuired for authentication" });
    }
  }
}

module.exports = new Token().authentiate;
