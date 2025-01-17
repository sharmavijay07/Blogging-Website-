const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const isBlog = require('./middlewares/isBlog');
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const app = express();
app.use(express.json()); // Parse JSON payloads
app.use(isBlog.isBlog);

// Define routes
app.use('/', adminRoute);
app.use('/', userRoute);
app.use('/', blogRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
