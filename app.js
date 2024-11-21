import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

mongoose.connect(
    "mongodb+srv://noelmugisha332:sVpL4QJYB7azqeCe@cluster0.qnoof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(()=>app.listen(5000)).then(()=>console.log("Connected to the database and listening to port 5000...")).catch(err=>console.log(err));

app.use("/api/user", userRoutes);



//sVpL4QJYB7azqeCe