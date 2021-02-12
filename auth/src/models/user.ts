import mongoose, { Model, Document } from "mongoose";
import { Password } from "../services/password";

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

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret._id;
        ret.id = doc._id;
      },
      versionKey: false,
    },
  }
);

// pre-save hooks
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

// methods on the user model
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
