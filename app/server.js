import app from './app';
import dotenv from 'dotenv';
import { PORT } from './config';

dotenv.config();

const server = app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }

    console.log(`Server start from port: ${PORT}`);
});

export default server;
