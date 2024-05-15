import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ghulam:1234@cluster0.jsqqnid.mongodb.net/vr-db?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("database connected 🔥🔥🔥");
  } catch (error) {
    console.log(error);
  }
};

export default connectdb;
