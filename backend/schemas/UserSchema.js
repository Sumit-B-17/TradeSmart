const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameLowerCase: true,
  errorMessages: { UserExistsError: "That username is already registered." },
});

module.exports = { UserSchema };
