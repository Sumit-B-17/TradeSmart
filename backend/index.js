require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const mongoUrl = process.env.MONGO_URL;

const app = express();

const clientOrigins = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: clientOrigins.length ? clientOrigins : true }));
app.use(bodyParser.json());
const authSecret = process.env.AUTH_SECRET || crypto.randomBytes(32).toString("hex");
const signToken = (user) => {
  const payload = Buffer.from(JSON.stringify({ sub: user._id.toString(), exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString("base64url");
  const signature = crypto.createHmac("sha256", authSecret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
};

const requireAuth = async (req, res, next) => {
  const [payload, signature] = (req.headers.authorization || "").replace(/^Bearer\s+/i, "").split(".");
  if (!payload || !signature) return res.status(401).json({ message: "Please sign in to continue." });
  const expected = crypto.createHmac("sha256", authSecret).update(payload).digest();
  let supplied;
  try { supplied = Buffer.from(signature, "base64url"); } catch (_) { return res.status(401).json({ message: "Invalid session." }); }
  if (supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) {
    return res.status(401).json({ message: "Invalid session." });
  }
  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!claims.sub || claims.exp < Date.now()) return res.status(401).json({ message: "Your session has expired. Please sign in again." });
    req.user = await UserModel.findById(claims.sub).select("username email");
    if (!req.user) return res.status(401).json({ message: "User account was not found." });
    next();
  } catch (_) {
    return res.status(401).json({ message: "Invalid session." });
  }
};

app.post("/auth/register", async (req, res) => {
  const username = String(req.body.username || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  if (!username || !email || password.length < 8) {
    return res.status(400).json({ message: "Username and email are required; password must be at least 8 characters." });
  }
  try {
    const user = await UserModel.register(new UserModel({ username, email }), password);
    return res.status(201).json({ token: signToken(user), user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    const duplicate = error.name === "UserExistsError" || error.code === 11000;
    return res.status(duplicate ? 409 : 400).json({ message: duplicate ? "That username or email is already registered." : "Unable to create account." });
  }
});

app.post("/auth/login", (req, res, next) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "");
  if (!username || !password) return res.status(400).json({ message: "Username and password are required." });
  UserModel.authenticate()(username, password, (error, user) => {
    if (error) return next(error);
    if (!user) return res.status(401).json({ message: "Incorrect username or password." });
    return res.json({ token: signToken(user), user: { id: user.id, username: user.username, email: user.email } });
  });
});

app.get("/auth/me", requireAuth, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username, email: req.user.email });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   try {
//     await HoldingsModel.insertMany(tempHoldings.map((item) => ({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     })));

//     res.send("Holdings added successfully.");
//   } catch (error) {
//     console.error("Unable to add holdings:", error);
//     res.status(500).send("Unable to add holdings.");
//   }
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   try {
//     await PositionsModel.insertMany(tempPositions.map((item) => ({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     })));

//     res.send("Positions added successfully.");
//   } catch (error) {
//     console.error("Unable to add positions:", error);
//     res.status(500).send("Unable to add positions.");
//   }
// });

app.get("/allHoldings", requireAuth, async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", requireAuth, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", requireAuth, async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      userId: req.user._id,
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Unable to save order:", error);
    res.status(500).json({ message: "Unable to save order." });
  }
});

async function startServer() {
  if (!mongoUrl) {
    console.error("MONGO_URL must be configured before the server can start.");
    process.exit(1);
  }
  if (process.env.NODE_ENV === "production" && (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32)) {
    console.error("Set AUTH_SECRET to a random value of at least 32 characters in production.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

startServer();
