import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        "mongodb+srv://ghulam:1234@cluster0.jsqqnid.mongodb.net/vr-db?retryWrites=true&w=majority&appName=Cluster0"
      );
      console.log("db connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
