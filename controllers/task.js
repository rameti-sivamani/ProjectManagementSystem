const Project = {};

//post Regquests
Project.createproject = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const deadline = req.body.deadline;
  Project.createproject({
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

Project.deleteProject = (req, res, next) => {
  const id = req.params.ProjectId;
  Project.findById(id)
    .then((result) => {
      console.log("The project is Successfully Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};

Project.updateProject=(req,res,next)=>{
    const id=req.params.ProjectId;
    const title=req.body.title;
    const deadline=req.body.deadline;

    
}