import express from "express";
import courses from "./routes/courses.route.js";
import cors from "cors";
import user from "./routes/user.route.js";
import cart from "./routes/cart.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/courses", courses);
app.use("/user", user);
app.use("/cart", cart);

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩, OG ");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
