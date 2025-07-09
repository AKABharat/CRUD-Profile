// Importing required modules
const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./modules/user");
const port = 3000;

// Middleware to parse incoming request bodies (JSON and URL-encoded data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting view engine to EJS for rendering dynamic templates
app.set("view engine", "ejs");

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route: Home page
app.get("/", (req, res) => {
  res.render("index"); // Render the 'index.ejs' template
});

// Route: Create a new user profile
app.post("/create", async (req, res) => {
  const { name, email, image } = req.body;
  const newUser = await userModel.create({ name, email, image });
  res.redirect(`/read`); // Redirect to the list of all users
});

// Route: Display all user profiles
app.get("/read", async (req, res) => {
  const users = await userModel.find();
  res.render("read", { users }); // Render 'read.ejs' with users data
});

// Route: Render the edit form for a single user
app.get("/edituser/:userId", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.userId });
  if (user != null) {
    res.render("edit", { user }); // Render 'edit.ejs' with user data
  } else {
    console.log("User not found: ", req.params.userId);
    res.redirect("/");
  }
});

// Route: Handle the submission of edited user data
app.post("/edit/:userId", async (req, res) => {
  const { name, email, image } = req.body;
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: req.params.userId },
    { name, email, image },
    { new: true }
  );
  res.redirect("/read");
});

// Route: Delete a user profile
app.get("/delete/:userId", async (req, res) => {
  const deletedUser = await userModel.findOneAndDelete({
    _id: req.params.userId,
  });
  console.log(`User deleted: ${deletedUser.name} (ID: ${deletedUser._id})`);
  res.redirect("/read");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log("Server is running on port:", port);
});
