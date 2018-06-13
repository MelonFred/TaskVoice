import mongoose from 'mongoose';

mongoose.Promise = Promise;

export default (mongoUri) => {
    if (!mongoUri) {
        throw Error('Mongo URI is undefined');
    }

    return mongoose.connect(mongoUri)
        .then(() => {
            console.log('Mongo connected');
        });
};
