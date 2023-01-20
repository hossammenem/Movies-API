import { config } from "dotenv"
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { protect } from "./middleware/authMiddleware"
import * as controllers  from "./controllers";
config()

const app = express();

app.use(cors({origin: "*",}));
app.use(express.json());


app.post('/register', controllers.register);
app.post('/login', controllers.login);
app.get('/userInfo', protect, controllers.userInfo);
app.post('/delete-from-watchlist', protect, controllers.deleteFromWatchlist)
app.post('/add-to-watchlist', protect, controllers.addToWatchlist)


mongoose.connect(process.env.MONGO_URI!).then(()=>{
    console.log('listening on port 5000');
    app.listen(5000)
})
