import React from 'react';
import { inject, observer } from 'mobx-react';

import { Input, Select } from 'antd';

import { POKEMON_TYPES } from 'utils/constants/pokemon';

import './Filters.styl';

const { Search } = Input;
const { Option } = Select;

function PokemonFilters({ handleFilters }) {
    return (
        <div className="pokemon-filters">
            <Search
                placeholder="Input a pokemon name"
                onSearch={value => handleFilters('name', value)}
            />

            <Select
                mode="tags"
                placeholder="Choose pokemon types"
                onChange={value => handleFilters('types', value)}
            >
                {Object.values(POKEMON_TYPES).map(({ text }) => (
                    <Option key={text}>{text}</Option>
                ))}
            </Select>
        </div>
    );
}

export default inject(({ pokemonStore: { handleFilters } }) => ({
    handleFilters
}))(observer(PokemonFilters));
