import mongoose from 'mongoose';

mongoose.Promise = Promise;

export default (mongoUri) => {
    if (!mongoUri) {
        throw Error('Mongo URI is undefined');
    }

    return new Promise((res, rej) => {
        mongoose.connect(mongoUri)
            .then((mongodb) => {
                res(mongodb);
                console.log('Mongo connected');
            })
            .catch((err) => {
                rej(err);
            });
    });
};
