import { observable, action, set, computed } from 'mobx';
import { bind } from 'decko';

class PokemonStore {
    constructor(stores) {
        this.stores = stores;
    }

    @observable
    pokemonsList = {
        isFetching: false,
        data: [],
        page: 1,
        perPage: 10,
        total: 0,
        name: '',
        types: []
    };

    @computed
    get filteredList() {
        const { name, types, data } = this.pokemonsList;

        // Prefer name filter than types
        // but also we can make filters more strict:
        // name + types
        if (name) {
            return data.filter(pokemon =>
                pokemon.name.includes(name.trim().toLowerCase())
            );
        }

        if (types.length) {
            return data.filter(pokemon =>
                pokemon.types.some(type => types.includes(type))
            );
        }

        return data;
    }

    @bind
    async getList() {
        this.changeList({ isFetching: true, data: [] });

        const { page, perPage } = this.pokemonsList;
        const offset = (page - 1) * perPage;
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${perPage}`
        );
        const data = await res.json();
        const { results, count } = data;

        let list = [];
        try {
            list = await Promise.all(
                results.map(async ({ name, url }) => {
                    const res = await fetch(url);
                    const json = await res.json();
                    const {
                        weight,
                        height,
                        sprites: { front_default }
                    } = json;
                    const types = json.types.map(({ slot, type }) => type.name);

                    return {
                        name,
                        url,
                        types,
                        height,
                        weight,
                        pic: front_default
                    };
                })
            );
        } catch (err) {
            console.warn('get info error', err);
        }

        this.changeList({
            isFetching: false,
            data: list,
            total: count
        });
    }

    @action.bound
    changeList(data) {
        set(this.pokemonsList, data);
    }

    @action.bound
    handlePagination(page, perPage) {
        set(this.pokemonsList, {
            perPage,
            page
        });

        this.getList();
    }

    @action.bound
    handleFilters(type, value) {
        set(this.pokemonsList, { [type]: value });
    }
}

export default PokemonStore;
