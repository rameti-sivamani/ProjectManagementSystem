const Task = require("../models/Project");
const { v4: uuidv4 } = require("uuid");

Task.createTask = (req, res, next) => {
  const projectId = req.params.projectId;
  const newTask = {
    taskId: uuidv4(),
    taskTitle: req.body.taskTitle,
    taskDescription: req.body.taskDescription,
    taskDeadline: req.body.taskDeadline,
    taskCategory: "notStarted",
  };
  Task.updateOne(
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

Task.deleteTask = (req, res, next) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  console.log(taskId);
  Task.findOne({
    _id: projectId,
  }).then((project) => {
    project.tasks = project.tasks.filter((task) => task.taskId !== taskId);
    return Task.updateOne(
      { _id: projectId },
      {
        $set: {
          tasks: project.tasks,
        },
      }
    );
  })
  .then(()=>{
    res.redirect(`/dashboard/projects/${projectId}`);
  })
};

Task.updateTaskCategory = (req, res, next) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  const taskCategory = req.body.taskCategory;
  console.log(taskId, taskCategory);
  Task.updateOne(
    { _id: projectId, "tasks.taskId": taskId },
    {
      $set: { "tasks.$.taskCategory": taskCategory },
    },
    {
      new: true,
    }
  )
    .then((result) => {
      res.redirect(`/dashboard/projects/${projectId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = Task;
