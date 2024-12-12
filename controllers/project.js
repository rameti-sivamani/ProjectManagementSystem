const Project = require("../models/Project");
const { v4: uuidv4 } = require("uuid");

//post Requests
Project.createproject = (req, res, next) => {
  const email = req.user.email; // Email of the user creating the project
  const title = req.body.title;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const members = req.body.members || []; // Members added by the creator
  const tasks = [];
  const mem = members.split(",").map((member) => member.trim()); // Add the creator to the members list with special privileges
  const projectMembers = [
    { email: email, role: "owner" }, // Creator with 'owner' privileges
    ...mem.map((member) => ({ email: member, role: "member" })), // Other members as 'member'
  ];

  Project.createProject({
    title: title,
    description: description,
    deadline: deadline,
    team: projectMembers, // Save project members with roles
    tasks: tasks,
  })
    .then((project) => {
      console.log("Project Created with members:", projectMembers);
      res
        .status(201)
        .json({ message: "Project created successfully", project });
    })
    .catch((err) => {
      console.error("Error creating project:", err);
      res.status(500).json({ message: "Error creating project", error: err });
    });
};

Project.deleteProject = (req, res, next) => {
  const id = req.params.projectId;
  //const id=req.body.projectId
  Project.findByIdAndDelete({ _id: id })
    .then((result) => {
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log(err);
    });
};

Project.createNewProject = (req, res, next) => {
  res.render("dashboard", {
    title: "Create project",
    path: "/dashboard/create",
  });
  res.redirect("/dashboard");
};

Project.viewProject = (req, res, next) => {
  const email = req.user.email;
  const id = req.params.projectId;
  Project.findOne({ _id: id })
    .then((project) => {
      res.render("dashboard", {
        title: "Project View",
        project: project,
        tasks: project.tasks,
        path: "/dashboard/projectId",
        owner: email,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

Project.createTask = (req, res, next) => {
  const projectId = req.params.projectId;
  const newTask = {
    taskId: uuidv4(),
    taskTitle: "create design", //req.body.taskTitle,
    taskDescription: "please this make this more quicker", //req.body.taskDescription,
    taskDeadline: "2024-12-23", //req.body.taskDeadline,
    taskStartedAt: "",
    taskCmpletedAt: "",
    taskCategory: "notStarted", //req.body.taksCategory
  };
  Project.updateOne(
    { _id: projectId },
    { $push: { tasks: newTask } },
    { new: true }
  )
    .then((result) => {
      res.redirect(`/dashboard/projects/${projectId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

Project.updateTaskCategory = (req, res, next) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  const taskCategory = req.body.taskCategory;
  console.log(taskId, taskCategory);
  Project.updateOne(
    { _id: projectId, "tasks.taskId": taskId },
    {
      $set: { "tasks.$.taskCategory": taskCategory },
    },
    {
      new: true,
    }
  )
    .then((result) => {
      console.log(result);
      res.redirect(`/dashboard/projects/${projectId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
const Items_Per_Page=2;
Project.displayTeams = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalProjects = 0;
  const email = req.user.email;
  Project.find({ "team.email": email })
    .countDocuments()
    .then((numProjects) => {
      totalProjects = numProjects;
      return Project.find({ "team.email": email })
        .skip((page - 1) * Items_Per_Page)
        .limit(Items_Per_Page);
    })
    .then((projects) => {
      res.render("dashboard", {
        title: "Teams",
        projects: projects,
        path: "/dashboard/teams",
        owner: email,
        currentPage: page,
        hasNextPage: Items_Per_Page * page < totalProjects,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalProjects / Items_Per_Page),
      });
    }); 
};


Project.displayReports=(req,res,next)=>{
  let totalProjects = 0;
  const email = req.user.email;
  Project.find({ "team.email": email })
    .countDocuments()
    .then((numProjects) => {
      totalProjects = numProjects;
      return Project.find({ "team.email": email })
    })
    .then((projects) => {
      res.render("dashboard", {
        title: "Reports",
        projects: projects,
        path: "/dashboard/reports",
        owner: email,
      });
    }); 
}


module.exports = Project;
