const router = require("express").Router();
const { Games, Review } = require("../../models");
const withAuth = require('../../utils/auth');

// /api/games endpoint

router.get("/", async (req, res) => {
  // retro fit this code to our db
  try {
    const gamesData = await Games.findAll({
      include: [{
        model: Review,
        attributes: ["id", "review", "date_created", "user_id"],
      },
      ],
    });
    console.log(gamesData
    ); const game = gamesData.map((game) => game.get({ plain: true }));
    console.log("game", game);
    res.status(200).json(gamesData);
    console.log()
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // retro fit this code to our db
  try {
    const gamesData = await Games.findByPk(req.params.id, {
      include: [{
        model: Review,
        attributes: ["id", "review_body", "review_date", "user_id"],
      },
      ],
    });
    if (!gamesData) {
      res.status(404).json({ message: 'No Game found with this id' });
      return;
    }
    res.status(200).json(gamesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/", withAuth, async (req, res) => {

  try {
    console.log("---------------POSTING--------------");
    console.log(req.body);

    const gamesData = await Games.create(req.body, {
      title: req.body.title,
      game_description: req.body.description,
      release_date: req.body.released,
      metacritic: req.body.metacritic,
      background_image: req.body.background_image
    });

    res.status(200).json("Nice job. You added to the DB");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete user
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const userData = await Games.destroy({ where: { id: req.params.id } });
    if (!userData) {
      res.status(404).json("User Not Found");
    }
    res.status(200).json("Succesfully Deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;