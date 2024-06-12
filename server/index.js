const express = require("express");
const { connect } = require("./config/database");
const app = express();
const userRoute = require("./routes/user.route");
const gigRoute = require("./routes/gig.route");
const orderRoute = require("./routes/order.route");
const conversationRoute = require("./routes/conversation.route");
const messageRoute = require("./routes/message.route");
const reviewRoute = require("./routes/review.route");
const authRoute = require("./routes/auth.route");

const cookieParser = require("cookie-parser");
const cors = require("cors");

connect();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/auth", authRoute);

//Error handling using middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong !";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8000, () => {
  console.log("backend is running");
});
