import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const createUserValid = (req, res, next) => {
  const required = ["firstName", "lastName", "email", "phoneNumber", "password"];
  const user = req.body;
  const keys = Object.keys(user)

  if(!required.every(property => keys.includes(property)))  {
    res.err = "User contains empty field";
    return next();
  }

  const invalidPhone = (phoneNumber) => {
    if(!user.phoneNumber.startsWith('+380')) 
      return true;

    const unique = user.phoneNumber.substring(4);
    if(unique.length !== 9 || ![...unique].every(symbol => Number(symbol) == symbol))
      return true;

    return false;
  }

  if(!user.email.endsWith('@gmail.com') || invalidPhone(!user.phoneNumber) || user.password < 3) {
    res.err = "User data is not valid";
    return next();
  }

  if(userService.search({email: user.email}) || userService.search({phoneNumber: user.phoneNumber})) {
    res.err = "User with same email or phone already exists";
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const user = req.body;
  const id = req.params.id;

  const invalidPhone = (phoneNumber) => {
    if(!user.phoneNumber.startsWith('+380')) 
      return true;

    const unique = user.phoneNumber.substring(4);
    if(unique.length !== 9 || ![...unique].every(symbol => Number(symbol) == symbol))
      return true;

    return false;
  }

  if((user.email && !user.email.endsWith('@gmail.com')) 
    || (user.phoneNumber && invalidPhone(!user.phoneNumber)) 
    || (user.password && user.password < 3)
  ) {
    res.err = "User data is not valid";
    return next();
  }

  const emailUser = userService.search({email: user.email})
  const phoneUser = userService.search({phoneNumber: user.phoneNumber})
  if((emailUser && emailUser.id !== id) || (phoneUser && phoneUser.id !== id)) {
    res.err = "User with same email or phone already exists";
  }
  
  next();
};

export { createUserValid, updateUserValid };
