import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.js';
import expenseRouter from "./routes/expense.js";
import database from './config/database.js';
import validateToken from './middleware/auth.js';

dotenv.config();

const PORT = process.env.SERVER_PORT;

// connecting to database
database();

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/api/auth', userRouter);

app.use('/api/expense', validateToken);
app.use('/api/expense', expenseRouter);

app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);
});