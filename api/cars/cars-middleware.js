const { getById, getAll } = require("./cars-model");

const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const car = await getById(req.params.id);
    if (car) {
      req.car = car;
      next();
    } else {
      next({
        status: 404,
        message: `car with id ${req.params.id} is not found`,
      });
    }
  } catch (err) {
    next();
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
