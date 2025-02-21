import { validateToken} from "../services/authentication.js"

async function authMiddleware(req, res, next){
  const token = req.header("Authorization")?.split(" ")[1];
  if(!token){
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const user = await validateToken(token);
    req.user = user;
  } catch(error) {
      return res.status(500).json({ message: error.message });
  }
  next()
}

export { authMiddleware};