import User from 'user/userSchema';

async function getUser(req, res) {
    try {
        const {
            user: { _id }
        } = req;

        const user = await User.findById(_id);
        const { username, pokemons } = user;

        return res.json({
            data: {
                username,
                pokemons
            },
            success: true
        });
    } catch (err) {
        return res.json({ success: false });
    }
}

export default getUser;
