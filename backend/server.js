import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import movieRoutes from './routes/movie.routes.js'
import tvRoutes from './routes/tv.routes.js'
import searchRoutes from './routes/search.routes.js'
import cookieParser from 'cookie-parser'
import { connectToDatabase } from './lib/connectDB.js'
import { protectedRoute } from './middleware/protectRoute.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json()) // allow us to parse req.body
// ROUTES
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", protectedRoute, movieRoutes)
app.use("/api/v1/tv", protectedRoute, tvRoutes)
app.use("/api/v1/search", protectedRoute, searchRoutes)

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
    connectToDatabase()
})

