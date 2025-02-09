const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");
const { SUPER_ADMIN } = require("../constants/role");

const register = async (req, res) => {
  let user = req.body;

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "missing information" });
  }

  try {
    const hash = bcrypt.hashSync(password, 10);

    user.password = hash;

    const UserSchema = new userModel(user);

    const userCreated = await UserSchema.save();
    return res
      .status(200)
      .json({ status: "success", data: { user: userCreated } });
  } catch (error) {
    console.log("Error creating user", error);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "missing information" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).json({ message: "email or password incorrect" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(500).json({ message: "email or password incorrect" });
    }

    req.session.user = {
      _id: user._id,
    };

    const token = jwt.sign(
      { user: { id: user._id, email: user.email, role: user.role } },
      process.env.JWT_SECRET_KEY
    );

    return res.status(200).json({ status: "success", data: { token } });
  } catch (error) {
    console.log("Error logging user", error);
    return res.status(500).json({ error: "error logging in" });
  }
};

const createSuperAdmin = async () => {
  try {
    const superAdminExists = await userModel.findOne({ role: "superAdmin" });

    if (!superAdminExists) {
      const hashedPassword = await bcrypt.hashSync("core5234", 10);

      const superAdmin = new userModel({
        firstName: "Super",
        lastName: "Admin",
        email: "dhamiruchi5@gmail.com",
        password: hashedPassword,
        role: "superAdmin",
      });

      await superAdmin.save();
      console.log("Superadmin created successfully");
    } else {
      console.log("Superadmin already exists");
    }
  } catch (error) {
    console.error("Error creating superadmin:", error);
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({ role: { $ne: SUPER_ADMIN } })
      .select("firstName lastName email role  buildings floors")
      .exec();
    return res.status(200).json({ status: "success", data: { users } });
  } catch (error) {
    console.error("Error retrieving users: ", error);
    return res.status(500).json({ error: "error in fetching" });
  }
};

module.exports = {
  register,
  login,
  createSuperAdmin,
  listUsers,
};
