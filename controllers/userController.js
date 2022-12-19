const catchAsync = require("../utils/catchAsync");
const UserObj = require("../models/userModel");

exports.getUserByEmail = catchAsync(async function (req, res, next) {
    const email = req.params.email;
    const user = await UserObj.findOne({ email });
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