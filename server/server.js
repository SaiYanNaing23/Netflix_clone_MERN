import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movie.routes.js';
import tvRoutes from './routes/tv.routes.js';
import searchRoutes from './routes/search.routes.js';
import { Env_Vars } from './config/envVars.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/protectRoute.js';

dotenv.config();
const app = express();
const PORT = Env_Vars.PORT
const __dirname = path.resolve()

app.use(express.json());// will allow us to parse req.body
app.use(cookieParser());// will allow us to parse

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/movie', protectRoute, movieRoutes)
app.use('/api/v1/tv', protectRoute, tvRoutes)
app.use('/api/v1/search', protectRoute, searchRoutes)

if(Env_Vars.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}
app.listen(PORT, () => {
    console.log('Server is running on port 4000');
    connectDB();
})
