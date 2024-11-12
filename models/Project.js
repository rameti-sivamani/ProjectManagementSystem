const Project = require("../Schema/Project");

Project.createProject = (project) => {
  const newProject = new Project({
    title: project.title,
    description: project.description,
    status:"ongoing",
    deadline: project.deadline,
    team: project.team, // Save project members with roles
    tasks: project.tasks,
  });
  return newProject
    .save()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

module.exports = Project;
