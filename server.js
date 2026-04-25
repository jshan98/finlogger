import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import expenseRoutes from './routes/expenseRoutes.js';

const app = express();
app.use(cors()); // Allows for cross-origin requests
app.use(bodyParser.json()) // parses the JSON request body

mongoose.connect('mongodb://localhost:27017/finlogger/?directConnection=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Server'))
.catch(error => console.error(`Error connecting to MongoDB Server: ${error}`));

// Routes
app.use('/expenses', expenseRoutes);

// Starts the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});