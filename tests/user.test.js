const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const {
  register,
  login,
  createSuperAdmin,
  listUsers,
} = require("../controllers/user.controller");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/user.model");

describe("Auth Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, session: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should return 400 if email or password is missing", async () => {
      req.body = { email: "", password: "" };

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "missing information" });
    });

    it("should hash the password and create a new user", async () => {
      const mockUser = { email: "test@example.com", password: "password123" };
      req.body = mockUser;

      bcrypt.hashSync.mockReturnValue("hashedPassword");
      userModel.mockImplementation(() => ({
        save: jest
          .fn()
          .mockResolvedValue({ ...mockUser, password: "hashedPassword" }),
      }));

      await register(req, res);

      expect(bcrypt.hashSync).toHaveBeenCalledWith("password123", 10);
      expect(userModel).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "hashedPassword",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: {
          user: { email: "test@example.com", password: "hashedPassword" },
        },
      });
    });

    it("should return 500 if an error occurs", async () => {
      req.body = { email: "test@example.com", password: "password123" };

      bcrypt.hashSync.mockReturnValue("hashedPassword");
      userModel.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("Database error")),
      }));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
    });
  });

  describe("login", () => {
    it("should return 400 if email or password is missing", async () => {
      req.body = { email: "", password: "" };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "missing information" });
    });

    it("should return 500 if user does not exist", async () => {
      req.body = { email: "test@example.com", password: "password123" };

      userModel.findOne.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "email or password incorrect",
      });
    });

    it("should return 500 if password is incorrect", async () => {
      req.body = { email: "test@example.com", password: "password123" };

      userModel.findOne.mockResolvedValue({ password: "hashedPassword" });
      bcrypt.compareSync.mockReturnValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "email or password incorrect",
      });
    });

    it("should return a token if login is successful", async () => {
      req.body = { email: "test@example.com", password: "password123" };

      const mockUser = {
        _id: "1",
        email: "test@example.com",
        password: "hashedPassword",
        role: "user",
      };
      userModel.findOne.mockResolvedValue(mockUser);
      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue("mockToken");

      await login(req, res);

      expect(jwt.sign).toHaveBeenCalledWith(
        { user: { id: "1", email: "test@example.com", role: "user" } },
        process.env.JWT_SECRET_KEY
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { token: "mockToken" },
      });
    });
  });

  describe("createSuperAdmin", () => {
    it("should create a super admin if one does not exist", async () => {
      userModel.findOne.mockResolvedValue(null);
      bcrypt.hashSync.mockReturnValue("hashedPassword");
      userModel.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({}),
      }));

      await createSuperAdmin();

      expect(userModel.findOne).toHaveBeenCalledWith({ role: "superAdmin" });
      expect(bcrypt.hashSync).toHaveBeenCalledWith("core5234", 10);
    });

    it("should log a message if super admin already exists", async () => {
      userModel.findOne.mockResolvedValue({ role: "superAdmin" });

      console.log = jest.fn();

      await createSuperAdmin();

      expect(userModel.findOne).toHaveBeenCalledWith({ role: "superAdmin" });
      expect(console.log).toHaveBeenCalledWith("Superadmin already exists");
    });
  });

  describe("listUsers", () => {
    it("should return a list of users", async () => {
      const mockUsers = [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          role: "user",
        },
      ];
      userModel.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockUsers),
        }),
      });

      await listUsers(req, res);

      // Update expected value to match the implementation
      expect(userModel.find).toHaveBeenCalledWith({
        role: { $ne: "superAdmin" },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { users: mockUsers },
      });
    });

    it("should return 500 if an error occurs", async () => {
      userModel.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockRejectedValue(new Error("Database error")),
        }),
      });

      await listUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error in fetching" });
    });
  });
});
