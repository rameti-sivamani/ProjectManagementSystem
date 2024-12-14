const Project = require("../models/Project");
const { v4: uuidv4 } = require("uuid");

//post Requests
Project.createproject = (req, res, next) => {
  const projectId=req.body.projectId || "";
  const email = req.user.email; 
  const title = req.body.title;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const members = req.body.members || [];
  const tasks = [];
  const mem = members.split(",").map((member) => member.trim()); 
  const projectMembers = [
    { email: email, role: "owner" },
    ...mem.map((member) => ({ email: member, role: "member" })), 
  ];
  if(projectId==""){
  Project.createProject({
    title: title,
    description: description,
    deadline: deadline,
    team: projectMembers, 
    tasks: tasks,
  })
    .then((project) => {
      res.render("dashboard", {
        title: "Create project",
        message: "Project created Successfully",
        path:'/dashbord/create',
        redirectUrl: "/dashboard",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating project", error: err });
    });
  }
  else if(projectId!=""){
    Project.updateMany({_id:projectId},{
      $set:{
        title: title,
        description: description,
        deadline: deadline,
        team: projectMembers, 
        tasks: tasks,
      }
    }).then((project) => {
      res.render("dashboard", {
        title: "Create project",
        message: "Project Updated Successfully",
        path:'/dashbord/create',
        redirectUrl: "/dashboard",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating project", error: err });
    });
  }
};

Project.deleteProject = (req, res, next) => {
  const id = req.params.projectId;
  //const id=req.body.projectId
  Project.findByIdAndDelete({ _id: id })
    .then((result) => {
      res.render("dashboard", {
        title: "Dashboard",
        message: "Project Deleted Successfully",
        path:'/dashbord',
        redirectUrl: "/dashboard",
      });    })
    .catch((err) => {
      console.log(err);
    });
};

Project.createNewProject = (req, res, next) => {
  res.render("dashboard", {
    title: "Create project",
    message:"",
    redirectUrl:null,
    path: "/dashboard/create",
    
  });
};
Project.EditProject = (req, res, next) => {
  const id = req.params.projectId;
  const email=req.user.email;
  Project.findOne({ _id: id }).then((project) => {
    const members = project.team.filter(member => member.email !== email).map(member=>member.email);
    res.render("dashboard", {
      project: project,
      title: "Edit project",
      path: "/project/edit",
      members:members,
      message:""
    });
  });
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
        message:"",
        path: "/dashboard/projectId",
        owner: email,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};



const Items_Per_Page = 2;
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
        message:"",
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

Project.displayReports = (req, res, next) => {
  let totalProjects = 0;
  const email = req.user.email;
  Project.find({ "team.email": email })
    .countDocuments()
    .then((numProjects) => {
      totalProjects = numProjects;
      return Project.find({ "team.email": email });
    })
    .then((projects) => {
      res.render("dashboard", {
        title: "Reports",
        projects: projects,
        path: "/dashboard/reports",
        owner: email,
        message:""
      });
    });
};

Project.search = (req, res, next) => {
  const email = req.user.email;
  let find = req.query.find;
  if (find == "") {
    find = "No results found in the database";
  }
  Project.find({
    "team.email": email,
    title: { $regex: `.*${find}.*`, $options: "i" }
  }).then((projects) => {
    res.render("dashboard", {
      title: "Search",
      projects: projects,
      path: "/dashboard/search",
      owner: email,
      message:""
    });
  });
};

module.exports = Project;
