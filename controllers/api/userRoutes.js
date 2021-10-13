const router = require("express").Router();
const { User } = require("../../models");

// Posting for a login request
router.post("/login", async (req, res) => {
  try {
    // Gets user data compared to the email input
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If no userData returns sends err and returns
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Checks the password against the password from the userData
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is not a match returns out with an error
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Saves the session and sets the user_id to be used later to render the dashboard page and sets the logged_in status to true
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are logged in" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Posting to logout the user
router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});

// Post to create a new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are logged in" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
