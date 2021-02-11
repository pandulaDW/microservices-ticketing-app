import mongoose, { Model } from "mongoose";

// User model attributes
interface UserAttrs {
  email: string;
  password: string;
}

// enhancing the mongoose model interface
interface UserModel extends Model<any> {
  build: (attrs: UserAttrs) => Model<any>;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// methods on the user model
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User = mongoose.model<any, UserModel>("User", userSchema);
