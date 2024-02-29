import mongoose from 'mongoose';

const CONNECTION_URL = '' //Add your connection string to MongoDB Atlas Database

function connect() {
    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true})
    .then((result) => {
        console.log('Database connected');
    }).catch((err) => {
        console.log('There is not possible connect to database due to: ', err);
    })
}

export default connect;
