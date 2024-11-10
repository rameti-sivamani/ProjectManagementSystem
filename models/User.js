
const User = require("../Schema/User");

User.createUser = (user) => {
  const newUser = new User({
    email: user.email,
    fullname: user.fullname,
    password: user.password,
  })
  return newUser.save()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

User.findByEmail=(email)=>{
  return User.findOne({email:email}).exec();
}
module.exports = User;
