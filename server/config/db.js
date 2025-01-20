import mongoose from "mongoose";

const connectToMongo = async  () =>
    {
           const res = await mongoose.connect("mongodb://localhost:27017/blog-mern");
           if(res)
            {
                console.log("Connected successfully");
            }
    };
export default connectToMongo;

