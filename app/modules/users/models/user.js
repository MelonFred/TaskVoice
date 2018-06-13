import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
    email: {
        type: String,
        unique: 'Пользователь с таким email уже существует!',
        lowercase: true,
        required: 'Поле "Email" является обязательным!',
    },
    password: {
        type: String,
        required: 'Поле "Пароль" является обязательным!',
    },
    firstName: {
        type: String,
        lowercase: true,
        required: 'Поле "Имя" является обязательным!',
    },
    lastName: {
        type: String,
        lowercase: true,
        required: 'Поле "Фамилия" является обязательным!',
    },
}, {
    timestamps: true,
});

UserSchema.statics.createFields = ['email', 'password', 'firstName', 'lastName'];

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = bcrypt.genSaltSync(10);

    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

UserSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.findOneWithPublicFields = function(params, cb) {
    return this.findOne(params, cb).select({ password: 0, _id: 0, __v: 0, createdAd: 0, updatedAd: 0 });
};

export default mongoose.model('user', UserSchema);
