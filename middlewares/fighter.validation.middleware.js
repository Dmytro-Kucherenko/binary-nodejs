import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const {id, health, ...required} = FIGHTER;
  const fighter = req.body;
  const keys = Object.keys(fighter);

  if(!Object.keys(required).every(property => keys.includes(property)))  {
    res.err = "Fighter contains empty field";
    return next();
  }

  const invalidHealth = (data) => {
    if(data.health) {
      return data.health < 80 || data.health > 120;
    }
    
    data.health = 100;
    return false;
  }

  if(fighter.name.length < 3 
    || (fighter.power > 100 || fighter.power < 1) 
    || (fighter.defense > 100 || fighter.defense < 1)
    || invalidHealth(fighter)
  ) {
    res.err = "Fighter data is not valid";
    return next();
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const fighter = req.body;

  if(Object.keys(fighter).length < 1 
    || (fighter.name && fighter.name.length < 3)
    || (fighter.power && fighter.power > 100 || fighter.power < 1) 
    || (fighter.defense && fighter.defense > 100 || fighter.defense < 1)
    || (fighter.health && fighter.health < 80 || fighter.health > 120)
  ) {
    res.err = "Fighter data is not valid";
    return next();
  }

  next();
};

export { createFighterValid, updateFighterValid };
