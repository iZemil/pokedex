import User from 'user/userSchema';

async function postPokemon(req, res) {
    try {
        const {
            user: { _id },
            body: { pokemon }
        } = req;

        const user = await User.findById(_id);
        const { pokemons } = user;
        const removePokemon = pokemons.includes(pokemon);
        const operator = removePokemon ? '$pull' : '$push';

        await User.findOneAndUpdate(
            { _id },
            {
                [operator]: { pokemons: pokemon }
            }
        );

        return res.json({
            success: true
        });
    } catch (err) {
        return res.json({ success: false });
    }
}

export default postPokemon;
