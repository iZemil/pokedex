import mongoose, { Schema } from 'mongoose';
// import bcrypt from 'bcrypt';

const userScheme = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        pokemons: [{ type: String }]
    },
    {
        collection: 'users'
    }
);

// userScheme.methods.comparePassword = async function comparePassword(password) {
//     const isEqual = await bcrypt.compare(password, this.password);

//     return isEqual;
// };

/**
 * The pre-save hook method.
 */
// userScheme.pre('save', function saveHook(next) {
//     const user = this;

//     // proceed further only if the password is modified or the user is new
//     if (!user.isModified('password')) return next();

//     return bcrypt.genSalt(10, function(saltError, salt) {
//         if (saltError) return next(saltError);

//         return bcrypt.hash(user.password, salt, function(hashError, hash) {
//             if (hashError) {
//                 return next(hashError);
//             }

//             // replace a password string with hash value
//             user.password = hash;

//             return next();
//         });
//     });
// });

export default mongoose.model('User', userScheme);
