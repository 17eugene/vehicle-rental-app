const userGetCurrent = (req, res) => {
  const { _id, email, name, role } = req.user;
  

  res.status(200).json({
    message: "Success",
    code: 200,
    data: {
      _id,
      email,
      name,
      role,
    },
  });
};

module.exports = userGetCurrent;
