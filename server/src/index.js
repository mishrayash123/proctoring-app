const app = require("./App");
const conneciton = require("./config/db");
const admin = require("./models/users/admin");


conneciton.once("open", async () => {
  const exAdmin = await admin.find({ email: "admin@decotechs.com" });
  if (exAdmin.length == 0) {
    const newAdmin = new admin({
      email: "admin@decotechs.com",
      password: "Admin123",
    });

    newAdmin.save();
  }
  console.log(`Database Connected`);
});
const PORT =  8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
