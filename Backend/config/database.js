import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const CONNECTION_URL = "mongodb+srv://expenser-db:admin@cluster0.dgk4a.mongodb.net/";

function connect() {
    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true})
    .then((result) => {
        console.log('Database connected');
    }).catch((err) => {
        console.log('There is not possible connect to database due to: ', err);
    })
}

export default connect;
