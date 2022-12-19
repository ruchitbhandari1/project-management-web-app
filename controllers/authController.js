const UserObj = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async function (req, res, next) {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  }
  const oldSameUser = await UserObj.findOne({ email: newUser.email });
    if (oldSameUser) {
        return next(new Error("User already exists"));
    }
    const user = await UserObj.create(newUser);
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
    res.status(201).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
})

exports.login = catchAsync(async function (req, res, next) {
    const {email, password} = req.body;
    if (!email || !password) {
        return next(new Error("Please provide email and password"));
    }
    const user = await UserObj.findOne({ email })
    if (!user){
        return next(new Error("User not found"));
    }
    if (!await bcrypt.compare(password, user.password)) {
        return next(new Error("Incorrect password"));
    }
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
    res.status(200).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
})

// verify is used to verify the token and get the user data and send it back to the client
exports.verify = catchAsync(async function (req, res, next) {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return next(new Error("You are not logged in"));
    }
    const token = accessToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserObj.findById(decoded._id);
    if (!user) {
        return next(new Error("User not found"));
    }
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
})

// protect is used to verify the token and get the user data and give it to the next middleware
exports.protect = catchAsync(async function (req, res, next) {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return next(new Error("You are not logged in"));
    }
    const token = accessToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserObj.findById(decoded._id);
    if (!user) {
        return next(new Error("User not found"));
    }
    req.user = user;
    next();
})

exports.logout = catchAsync(async function (req, res, next) {
    res.cookie("jwt", "")
    res.status(200).json({
        status: "success",
        data: null,
    });
})