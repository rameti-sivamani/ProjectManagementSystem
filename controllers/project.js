const Project = require("../models/Project");

//post Requests
Project.createproject = (req, res, next) => {
  const email = req.user.email; // Email of the user creating the project
  const title = req.body.title;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const members = req.body.members || []; // Members added by the creator
  const tasks = [];
  // Add the creator to the members list with special privileges
  const projectMembers = [
    { email: email, role: "owner" }, // Creator with 'owner' privileges
    ...members.map((member) => ({ email: member, role: "member" })), // Other members as 'member'
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

Project.getAllProjects=(req,res,next)=>{
  const email=req.user.email;
  Project.find({ 'team.email': email })
  .then((projects) => {
    if (projects.length > 0) {
      console.log('Projects found:', projects);
      return projects;
    } else {
      console.log('No projects found for this email');
      res.status(500).json({ message: "Error creating project", error: err });

    }
  })
  .catch((err) => {
    console.error('Error finding projects:', err);
  });
}
module.exports = Project;
