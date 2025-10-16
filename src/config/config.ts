import config from "dotenv"

const configfile = "./env"

const {MONGO_URI , PORT , JWT_SECRET , MESSAGE_BROKER_URL} = process.env;
// config({path : configfile})

const queue = { notifications: "NOTIFICATIONS" };
export default{
    MESSAGE_BROKER_URL,
    queue,
    MONGO_URI,
    PORT,
    JWT_SECRET
}