import { userRepository } from "../repositories/userRepository.js";

class UserService {
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAll() {
    const item = userRepository.getAll();
    return item;
  }
}

const userService = new UserService();

export { userService };
