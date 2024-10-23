import mongoose from "mongoose";
const DBconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    } catch (err) {
        console.error(err);
    }
}
export default DBconnection;