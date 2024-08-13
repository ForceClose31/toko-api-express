const getAllUsers = (req, res) => {
  res.json({
    nama: "sung ji",
    umur: 22,
  });
};

const createNewUsers = (req, res) => {
  res.json({
    message: "Post succes",
  });
};


module.exports = {
    getAllUsers,
    createNewUsers
}