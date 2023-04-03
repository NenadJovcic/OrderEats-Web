import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"

const app = express()
const PORT = 3333
app.use(cors())
app.use(express.json());


const db = "mongodb+srv://nenadhif:465289nj@kurs4projekt.ykrbwgz.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db).then(() => {console.log("db connected")}).catch((err) => {throw err})

app.use("/users", userRoutes)

app.listen(PORT, () => {console.log(`App listening on port ${PORT}`)})

// app.use('/', router);