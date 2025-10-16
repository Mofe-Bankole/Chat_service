import express, { Response } from "express"
import messageRoutes from "./src/routes/messageRoutes";

const PORT = 2099;

const app = express()
app.use(express.json())
app.use(express.urlencoded)

app.get("/health" , async(req , res) => {
    res.json({
        message : "Chat service is up and running"
    })
})

app.use("/messaging" , messageRoutes);

app.listen(PORT , () => {
    console.log(`SERVICE IS UP AND RUNNING ON PORT ${PORT}`); 
})