import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/user";

const API_KEY = "23c2625d"

const generateToken = (id: String) => {
    return jwt.sign({ id }, "askldfjlsdfuwoifj213io471890rsklvjKLJSDLJ:SDJKL:ASJDPAKDFJSKL:DVJXZC:KLASJDPFOQEmn", {
        expiresIn: "2d",
    });
} 

export async function register(req: Request, res: Response) {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({ $or:[{name}, {email}]});

    if (!name || !email || !password) {
        return res.status(400).json("All Fields Are Required");
    }

    if(userExists){
        return res.status(400).json("Username Or Email Already In Use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        watchlist: []
    });

    if(user){
        res.status(201).json({ id: user.id, token: generateToken(user.id) });
    } else {
        res.status(400).json("Invalid User Data");
    }
}

export async function login(req: Request, res: Response) {
    const {name, password} = req.body;

    const user = await User.findOne({$or:[{name: name}, {email: name}]});
    
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ id: user.id, token: generateToken(user.id) });
    } else {
        res.status(400).json("Username Or Password Is Incorrect");
    }
}

export async function userInfo(req: Request, res: Response) {
  const { _id, name, email, watchlist }: any = await User.findById(req.user.id);
  res.status(200).json({
    _id,
    name,
    email,
    watchlist
  });
}

export async function addToWatchlist(req: Request, res: Response) {
  const user = await User.findById(req.user.id)
  const { movie } = req.body
  if(user?.watchlist.includes(movie)){
    res.status(400).json('movie already added')
  } else {
    await user?.updateOne({ $push: {watchlist: movie}})
    res.status(200).json('movie added successfully')
  }
}

export async function deleteFromWatchlist(req: Request, res: Response) {
  const user = await User.findById(req.user.id)
  const { movie } = req.body
  if(!user?.watchlist.includes(movie)){
    res.status(400).json('movie doesn\' exists in your watchlist')
  } else {
    await user?.updateOne({ $pull: {watchlist: movie}})
    res.status(200).json('movie deleted successfully')
  }
}