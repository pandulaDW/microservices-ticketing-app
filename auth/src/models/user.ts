import mongoose, { Model, Document } from "mongoose";

// User model attributes
interface UserAttrs {
  email: string;
  password: string;
}

// enhancing the mongoose document interface
interface UserDoc extends Document {
  email: string;
  password: string;
}

// enhancing the mongoose model interface
interface UserModel extends Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc;
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

export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
