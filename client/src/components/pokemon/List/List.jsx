import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Tag, Pagination, Icon } from 'antd';

import { POKEMON_TYPES } from 'utils/constants/pokemon';

import PokemonFilters from '../Filters';

import './List.styl';

const getColor = type =>
    POKEMON_TYPES[type] ? POKEMON_TYPES[type].color : '#b6b6b6';

const columns = [
    {
        title: 'Pokemon',
        dataIndex: 'name',
        key: 'name',
        render: (name, row) => (
            <div key={name}>
                <div className="pokemon-list__name">
                    {name}{' '}
                    <Icon
                        type="star"
                        // and switcher color
                        // style={{ color: 'yellow' }}
                        onClick={() =>
                            fetch('http://localhost:8080/pokemon', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ pokemon: name })
                            })
                        }
                    />
                </div>
                <div className="pokemon-list__pic">
                    {row.pic ? <img src={row.pic} alt={name} /> : '???'}
                </div>
            </div>
        )
    },
    {
        title: 'Info',
        key: 'info',
        render: (_, { name, types, weight, height }) => (
            <div key={name}>
                <div className="pokemon-list__info-row">
                    <strong>Type:</strong>{' '}
                    {types.map(type => (
                        <Tag key={type} color={getColor(type)}>
                            {type}
                        </Tag>
                    ))}
                </div>
                <div className="pokemon-list__info-row">
                    <strong>Height:</strong> {height}
                </div>
                <div className="pokemon-list__info-row">
                    <strong>Weight:</strong> {weight}
                </div>
            </div>
        )
    }
];

// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         tags: ['nice', 'developer']
//     },
// ];

@inject(
    ({
        pokemonStore: { pokemonsList, filteredList, getList, handlePagination }
    }) => ({
        pokemonsList,
        filteredList,
        getList,
        handlePagination
    })
)
@observer
class PokemonList extends Component {
    componentDidMount() {
        const { getList } = this.props;

        getList();
    }

    render() {
        const {
            filteredList,
            pokemonsList: { total, page, perPage, isFetching },
            handlePagination
        } = this.props;

        return (
            <div className="pokemon-list">
                <h1>Pokemons List</h1>

                <PokemonFilters />

                <Table
                    loading={isFetching}
                    size="middle"
                    pagination={false}
                    columns={columns}
                    dataSource={filteredList}
                />

                <Pagination
                    className="pokemon-list__pagination"
                    current={page}
                    total={total}
                    onChange={handlePagination}
                    pageSize={perPage}
                    showSizeChanger
                    pageSizeOptions={['10', '20', '50']}
                    onShowSizeChange={handlePagination}
                />
            </div>
        );
    }
}

export default PokemonList;
