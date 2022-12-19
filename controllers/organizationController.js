const catchAsync = require("../utils/catchAsync");
const OrgObj = require("../models/orgModel");
const { default: mongoose } = require("mongoose");

exports.createOrganization = catchAsync(async function (req, res, next) {
    const newOrg = {
        name: req.body.name,
        admin: [req.user.id],
        members: [req.user.id],
    }
    const org = await OrgObj.create(newOrg);
    res.status(201).json({
        status: "success",
        data: {
            org,
        }
    })
})

exports.getMyOrganizations = catchAsync(async function (req, res, next) {
    const userId = req.user.id;
    const orgs = await OrgObj.find({
        members: mongoose.Types.ObjectId(userId)
    })
    res.status(200).json({
        status: "success",
        data: {
            orgs,
        }
    })
})

exports.getOrganization = catchAsync(async function (req, res, next) {
    const orgId = req.params.orgId;
    const org = await OrgObj.findById(orgId);
    if (!org) {
        return next(new Error("No organization found with that ID"));
    }
    res.status(200).json({
        status: "success",
        data: {
            org,
        }
    })
})

exports.getAllOrganizations = catchAsync(async function (req, res, next) {
    const search = req.query.search;
    let orgs = await OrgObj.find()
    orgs = orgs.filter((org) => {
        return org.name.toLowerCase().includes(search.toLowerCase());
    })
    res.status(200).json({
        status: "success",
        data: {
            orgs,
        }
    })
})

exports.requestToJoin = catchAsync(async function (req, res, next) {
    const orgId = req.params.orgId;
    const userId = req.user.id;
    const org = await OrgObj.findById(orgId);
    if (!org) {
        return next(new Error("No organization found with that ID"));
    }
    org.requests.push({
        userId: mongoose.Types.ObjectId(userId),
        name: req.user.name,
        email: req.user.email,
    });
    await org.save();
    res.status(200).json({
        status: "success",
        data: {}
    })
})

exports.getRequests = catchAsync(async function (req, res, next) {
    const orgId = req.params.orgId;
    const org = await OrgObj.findById(orgId);
    if (!org) {
        return next(new Error("No organization found with that ID"));
    }
    const requests = org.requests;
    res.status(200).json({
        status: "success",
        data: {
            requests,
        }
    })
})

exports.acceptRequest = catchAsync(async function (req, res, next) {
    const orgId = req.params.orgId;
    const userId = req.params.userId;
    const org = await OrgObj.findById(orgId);
    if (!org) {
        return next(new Error("No organization found with that ID"));
    }
    org.members.push(mongoose.Types.ObjectId(userId));
    org.requests = org.requests.filter((request) => {
        return request.userId.toString() !== userId;
    })
    await org.save();
    res.status(200).json({
        status: "success",
        data: {}
    })
})

exports.rejectRequest = catchAsync(async function (req, res, next) {
    const orgId = req.params.orgId;
    const userId = req.params.userId;
    const org = await OrgObj.findById(orgId);
    if (!org) {
        return next(new Error("No organization found with that ID"));
    }
    org.requests = org.requests.filter((request) => {
        return request.userId.toString() !== userId;
    })
    await org.save();
    res.status(200).json({
        status: "success",
        data: {}
    })
})