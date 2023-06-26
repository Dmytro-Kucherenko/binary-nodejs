import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const {id, ...required} = USER;
  const user = req.body;
  const keys = Object.keys(user);

  if(!Object.keys(required).every(property => keys.includes(property)))  {
    res.err = "User contains empty field";
    return next();
  }

  const invalidPhone = (phoneNumber) => {
    if(!phoneNumber.startsWith('+380')) 
      return true;

    const unique = phoneNumber.substring(4);
    if(unique.length !== 9 || ![...unique].every(symbol => Number(symbol) == symbol))
      return true;

    return false;
  }

  if(!user.email.endsWith('@gmail.com') || invalidPhone(user.phoneNumber) || user.password < 3) {
    res.err = "User data is not valid";
    return next();
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const user = req.body;
  const id = req.params.id;

  const invalidPhone = (phoneNumber) => {
    if(!phoneNumber.startsWith('+380')) 
      return true;

    const unique = phoneNumber.substring(4);
    if(unique.length !== 9 || ![...unique].every(symbol => Number(symbol) == symbol))
      return true;

    return false;
  }

  if((user.email && !user.email.endsWith('@gmail.com')) 
    || (user.phoneNumber && invalidPhone(user.phoneNumber)) 
    || (user.password && user.password < 3)
  ) {
    res.err = "User data is not valid";
    return next();
  }
  
  next();
};

export { createUserValid, updateUserValid };
