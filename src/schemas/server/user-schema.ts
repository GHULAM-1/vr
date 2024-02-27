import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userInfo: {
    userEmail: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
