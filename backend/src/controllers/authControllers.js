const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.utilisateur.getByPseudo(req.body.pseudo);

    if (!user[0]) {
      res.status(400).send("Incorrect pseudo or password");
    }
    if (user[0].password === req.body.password) {
      res.status(200).send(user[0]);
    } else {
      res.status(400).send("Incorrect pseudo or password");
    }
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { pseudo, email, password, image, admin, points, podium, tickets } =
      req.body;

    const result = await tables.utilisateur.create({
      pseudo,
      email,
      password,
      image,
      admin,
      points,
      podium,
      tickets,
    });
    if (result.insertId) {
      const newUser = {
        id: result.insertId,
        pseudo,
        email,
        password,
        image,
        admin,
        points,
        podium,
        tickets,
      };
      res.status(201).json(newUser);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  signin,
};
