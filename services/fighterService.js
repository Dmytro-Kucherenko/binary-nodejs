import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  searchAll() {
    const item = fighterRepository.getAll();
    return item;
  }

  create(fighter) {
    const exist = fighterService.search({name: fighter.name});
    if(exist) {
      throw "Fighter with same name already exists";
    }

    const item = fighterRepository.create(fighter);
    return item;
  }

  update(id, data) {
    const item = this.search({id: id});
    const exist = this.search({name: data.name});

    if(!item) {
      return null;
    }
    if(exist && exist.id !== id) {
      throw "Fighter with same name already exists";
    }

    return fighterRepository.update(id, data);
  }

  delete(id) {
    const item = this.search({id: id});
    if(!item) {
      return null;
    }

    fighterRepository.delete(id);
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
