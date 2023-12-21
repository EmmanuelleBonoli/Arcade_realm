const UtilisateurManager = require("../models/UtilisateurManager");
// const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await UtilisateurManager.getByPseudo(req.body.pseudo);

    const { password } = req.body.password;
    if (user.password === password) {
      res.status(200).send(user);
    } else {
      res.status(400).send("Incorrect email or password");
    }
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { pseudo, email, password, image, admin, points } = req.body;

    const result = await UtilisateurManager.create({
      pseudo,
      email,
      password,
      image,
      admin,
      points,
    });
    if (result.insertID) {
      res.sendStatus(201);
    } else {
      res.sendSstatus(400);
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  login,
  signin,
};
