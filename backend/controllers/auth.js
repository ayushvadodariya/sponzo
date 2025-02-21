import User from "../models/user.js";
import { createToken} from "../services/authentication.js";

async function signupController(req,res) {

  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({ message: "Provide email and password in body"});
  }
  try{
    const user = await User.create({
      email,
      password
    });
    const token = await createToken(user._id);
    return res.status(201).json({ token,  message: "User created successfully"});
  } catch(error){
    console.error(error);
    return res.status(500).json({message: error.message});
  }
}

async function signinController(req, res){
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({ message: "Provide email and password in body"});
  }

  try{
    const user = await User.findOne({ email });
    if(!user || !(await user.authenticate( password))){
      return res.status(401).json({ message: "Invalid email or password"});
    }
    const token = await createToken(user._id);
    return res.status(200).json({token:token, message: "Login successful"} );
  } catch(error){
    return res.status(500).json({ message: error.message});
  }
}

export { signupController, signinController }