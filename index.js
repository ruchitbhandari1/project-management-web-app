const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "vars/config.env" });
const app = require("./app.js");

const DATABASE = process.env.DATABASE;

mongoose.set('strictQuery', true);
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
