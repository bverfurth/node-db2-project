const express = require("express");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");
const Cars = require("./cars-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.status(200).json(cars);
  } catch (error) {
    next();
  }
});

router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.car);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  async (req, res, next) => {
    try {
      const newCar = await Cars.create(req.body);
      res.status(200).json(newCar);
    } catch (error) {
      next();
    }
  }
);

// ESLint-Disable
router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    custom: "Uh oh, Something no bueno happened",
    message: error.message,
    stack: error.stack,
  });
});

module.exports = router;
