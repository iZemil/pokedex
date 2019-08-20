import UserStore from './UserStore';
import PokemonStore from './PokemonStore';

class Stores {
    constructor() {
        this.userStore = new UserStore(this);
        this.pokemonStore = new PokemonStore(this);
    }
}

export default new Stores();
