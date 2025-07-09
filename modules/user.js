// Import Mongoose for MongoDB interaction
const mongoose = require("mongoose");

// Connect to MongoDB (CRUD_Profile database)
mongoose
  .connect("mongodb://localhost:27017/CRUD_Profile", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the User schema (structure of user documents)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Export the model to use in other parts of the app
module.exports = mongoose.model("User", userSchema);
