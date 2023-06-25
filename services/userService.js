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
    const item = userRepository.create(user);
    return item;
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
