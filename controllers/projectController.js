const catchAsync = require("./../utils/catchAsync");
const ProjectObj = require("./../models/projectModel");
const OrgObj = require("./../models/orgModel");
const { default: mongoose } = require("mongoose");

exports.getProject = catchAsync(async function (req, res, next) {
  const projectId = req.params.projectId;
  const project = await ProjectObj.findById(projectId)
    .populate("members")
    .populate("admin");
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.createProject = catchAsync(async function (req, res, next) {
  const orgId = req.body.orgId;
  const newProject = {
    name: req.body.name,
    description: req.body.description,
    admin: [req.user.id],
    members: [req.user.id],
    orgId,
  };
  const org = await OrgObj.findById(orgId)
    .populate("projects")
  if (org.projects.some((project) => project.name == newProject.name)) {
    return next(new Error(`${newProject.name} already exists`));
  }
  const project = await ProjectObj.create(newProject);
  org.projects.push(mongoose.Types.ObjectId(project._id));
  await org.save();
  res.status(201).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.deleteProject = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const projectId = req.params.projectId;
  const project = await ProjectObj.findById(projectId).populate("tasks")
  const org = await OrgObj.findById(project.orgId);
  org.projects = org.projects.filter((project) => !project.equals(projectId));
  await org.save();
  project.tasks.forEach(async (task) => {
    await task.deleteOne();
  })
  await project.deleteOne();
  res.status(204).json({
    status: "success",
    data: null,
  })
})

exports.addMember = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const projectId = req.body.projectId;
  const memberId = req.body.memberId;
  const project = await ProjectObj.findById(projectId);
  if (!project.admin.some((admin) => admin.equals(userId))) {
    return next(new Error("User is not an admin of the project"));
  }
  if (project.members.some((member) => member.equals(memberId))) {
    return next(new Error("User already a member of the project"));
  }
  project.members.push(mongoose.Types.ObjectId(memberId));
  await project.save();
  res.status(201).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.removeMember = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const projectId = req.body.projectId;
  const memberId = req.body.memberId;
  const project = await ProjectObj.findById(projectId);
  if (!project.admin.some((admin) => admin.equals(userId))) {
    return next(new Error("User is not an admin of the project"));
  }
  if (!project.members.some((member) => member.equals(memberId))) {
    return next(new Error("User is not a member of the project"));
  }
  project.members = project.members.filter(
    (member) => !member.equals(memberId)
  );
  await project.save();
  res.status(201).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.getMyOrgProjects = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const orgId = req.params.orgId;
  let { projects } = await OrgObj.findById(orgId).populate("projects");
  projects = projects.filter((project) =>
    project.members.some((member) => member.equals(userId))
  );
  res.status(200).json({
    status: "success",
    data: {
      projects,
    },
  });
});
