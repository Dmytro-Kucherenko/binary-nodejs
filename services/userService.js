import { userRepository } from "../repositories/userRepository.js";

class UserService {
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  searchAll() {
    const item = userRepository.getAll();
    return item;
  }

  create(user) {
    const emailUser = userService.search({email: user.email})
    const phoneUser = userService.search({phoneNumber: user.phoneNumber})
    if(emailUser || phoneUser) {
      throw "User with same email or phone already exists";
    }

    const item = userRepository.create(user);
    return item;
  }

  update(id, user) {
    const item = this.search({id: id});
    if(!item) {
      return null;
    }

    const emailUser = userService.search({email: user.email})
    const phoneUser = userService.search({phoneNumber: user.phoneNumber})
    if((emailUser && emailUser.id !== id) || (phoneUser && phoneUser.id !== id)) {
      throw "User with same email or phone already exists";
    }

    return userRepository.update(id, user);
  }

  delete(id) {
    const item = this.search({id: id});
    if(!item) {
      return null;
    }

    userRepository.delete(id);
    return item;
  }
}

const userService = new UserService();

export { userService };
