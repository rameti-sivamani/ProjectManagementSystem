
Project.getAllProjects = (req, res, next) => {
  Project.find()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};


Project.deleteProject = (req, res, next) => {
  const id = req.params.ProjectId;
  Project.deleteById(id)
    .then((result) => {
      console.log("The project is Successfully Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};

Project.updateProject = (req, res, next) => {
  const id = req.params.ProjectId;
  const title = req.body.title;
  const deadline = req.body.deadline;
  Project.update({
    title: title,
    description: description,
    deadline: deadline,
    team: team,
  })
    .then((project) => {
      console.log("project Created");
    })
    .catch((err) => {
      console.log(err);
    });
};
