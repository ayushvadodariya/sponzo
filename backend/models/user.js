import mongoose, { Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema({
  email: {
    type: String,
    unique:true,
    match: [emailRegex, 'Please provide valid email addresses'],
  },
  password: {
    type: String,
    required: true,
  },
},{ timestamps: true});

userSchema.methods.authenticate = async function (enteredPassword){
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch ? this : null;
}

userSchema.pre("save", async function (next){
  const user = this;
  if(!user.isModified('password')) return next();

  try{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch(error){
    return next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
