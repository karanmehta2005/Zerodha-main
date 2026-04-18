require("dotenv").config();
const dns = require('dns');

// Set DNS servers early to resolve MongoDB Atlas SRV records
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  console.log("DNS servers set successfully");
} catch (e) {
  console.warn("Failed to set DNS servers:", e.message);
}

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

let isMock = false;
const mockUsers = [];
const mockHoldings = [
  {
    name: "BHARTIARTL",
    qty: 2,
    avg: 538.05,
    price: 541.15,
    net: "+0.58%",
    day: "+2.99%",
  },
  {
    name: "HDFCBANK",
    qty: 2,
    avg: 1383.4,
    price: 1522.35,
    net: "+10.04%",
    day: "+0.11%",
  },
  {
    name: "HINDUNILVR",
    qty: 1,
    avg: 2335.85,
    price: 2417.4,
    net: "+3.49%",
    day: "+0.21%",
  },
  {
    name: "INFY",
    qty: 1,
    avg: 1350.5,
    price: 1555.45,
    net: "+15.18%",
    day: "-1.60%",
    isLoss: true,
  },
  {
    name: "ITC",
    qty: 5,
    avg: 202.0,
    price: 207.9,
    net: "+2.92%",
    day: "+0.80%",
  },
  {
    name: "KPITTECH",
    qty: 5,
    avg: 250.3,
    price: 266.45,
    net: "+6.45%",
    day: "+3.54%",
  },
  {
    name: "M&M",
    qty: 2,
    avg: 809.9,
    price: 779.8,
    net: "-3.72%",
    day: "-0.01%",
    isLoss: true,
  },
  {
    name: "RELIANCE",
    qty: 1,
    avg: 2193.7,
    price: 2112.4,
    net: "-3.71%",
    day: "+1.44%",
  },
  {
    name: "SBIN",
    qty: 4,
    avg: 324.35,
    price: 430.2,
    net: "+32.63%",
    day: "-0.34%",
    isLoss: true,
  },
  {
    name: "SGBMAY29",
    qty: 2,
    avg: 4727.0,
    price: 4719.0,
    net: "-0.17%",
    day: "+0.15%",
  },
  {
    name: "TATAPOWER",
    qty: 5,
    avg: 104.2,
    price: 124.15,
    net: "+19.15%",
    day: "-0.24%",
    isLoss: true,
  },
  {
    name: "TCS",
    qty: 1,
    avg: 3041.7,
    price: 3194.8,
    net: "+5.03%",
    day: "-0.25%",
    isLoss: true,
  },
  {
    name: "WIPRO",
    qty: 4,
    avg: 489.3,
    price: 577.75,
    net: "+18.08%",
    day: "+0.32%",
  },
];
const mockPositions = [
  {
    product: "CNC",
    name: "EVEREADY",
    qty: 2,
    avg: 316.27,
    price: 312.35,
    net: "+0.58%",
    day: "-1.24%",
    isLoss: true,
  },
  {
    product: "CNC",
    name: "JUBLFOOD",
    qty: 1,
    avg: 3124.75,
    price: 3082.65,
    net: "+10.04%",
    day: "-1.35%",
    isLoss: true,
  },
];
const mockOrders = [];


const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve Frontend static files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Serve Dashboard static files
app.use("/dashboard", express.static(path.join(__dirname, "../dashboard/build")));

app.get("/addHoldings", async (req, res) => {
  let tempHoldings = [
    {
      name: "BHARTIARTL",
      qty: 2,
      avg: 538.05,
      price: 541.15,
      net: "+2.99%",
      day: "+2.99%",
    },
    {
      name: "HDFCBANK",
      qty: 2,
      avg: 1383.4,
      price: 1522.35,
      net: "+0.11%",
      day: "+0.11%",
    },
    {
      name: "HINDUNILVR",
      qty: 1,
      avg: 2335.85,
      price: 2417.4,
      net: "+0.21%",
      day: "+0.21%",
    },
    {
      name: "INFY",
      qty: 1,
      avg: 1350.5,
      price: 1555.45,
      net: "-1.60%",
      day: "-1.60%",
      isLoss: true,
    },
    {
      name: "ITC",
      qty: 5,
      avg: 202.0,
      price: 207.9,
      net: "+0.80%",
      day: "+0.80%",
    },
    {
      name: "KPITTECH",
      qty: 5,
      avg: 250.3,
      price: 266.45,
      net: "+3.54%",
      day: "+3.54%",
    },
    {
      name: "M&M",
      qty: 2,
      avg: 809.9,
      price: 779.8,
      net: "-0.01%",
      day: "-0.01%",
      isLoss: true,
    },
    {
      name: "RELIANCE",
      qty: 1,
      avg: 2193.7,
      price: 2112.4,
      net: "+1.44%",
      day: "+1.44%",
    },
    {
      name: "SBIN",
      qty: 4,
      avg: 324.35,
      price: 430.2,
      net: "-0.34%",
      day: "-0.34%",
      isLoss: true,
    },
    {
      name: "SGBMAY29",
      qty: 2,
      avg: 4727.0,
      price: 4719.0,
      net: "+0.15%",
      day: "+0.15%",
    },
    {
      name: "TATAPOWER",
      qty: 5,
      avg: 104.2,
      price: 124.15,
      net: "-0.24%",
      day: "-0.24%",
      isLoss: true,
    },
    {
      name: "TCS",
      qty: 1,
      avg: 3041.7,
      price: 3194.8,
      net: "-0.25%",
      day: "-0.25%",
      isLoss: true,
    },
    {
      name: "WIPRO",
      qty: 4,
      avg: 489.3,
      price: 577.75,
      net: "+0.32%",
      day: "+0.32%",
    },
  ];

  try {
    const promises = tempHoldings.map((item) => {
      let newHolding = new HoldingsModel({
        name: item.name,
        qty: item.qty,
        avg: item.avg,
        price: item.price,
        net: item.day,
        day: item.day,
      });
      return newHolding.save();
    });

    await Promise.all(promises);
    res.send("Holdings added successfully!");
  } catch (err) {
    console.error("Error seeding holdings:", err);
    res.status(500).send("Error seeding holdings");
  }
});

app.get("/addPositions", async (req, res) => {
  let tempPositions = [
    {
      product: "CNC",
      name: "EVEREADY",
      qty: 2,
      avg: 316.27,
      price: 312.35,
      net: "+0.58%",
      day: "-1.24%",
      isLoss: true,
    },
    {
      product: "CNC",
      name: "JUBLFOOD",
      qty: 1,
      avg: 3124.75,
      price: 3082.65,
      net: "+10.04%",
      day: "-1.35%",
      isLoss: true,
    },
  ];

  try {
    const promises = tempPositions.map((item) => {
      let newPosition = new PositionsModel({
        product: item.product,
        name: item.name,
        qty: item.qty,
        avg: item.avg,
        price: item.price,
        net: item.net,
        day: item.day,
        isLoss: item.isLoss,
      });
      return newPosition.save();
    });

    await Promise.all(promises);
    res.send("Positions added successfully!");
  } catch (err) {
    console.error("Error seeding positions:", err);
    res.status(500).send("Error seeding positions");
  }
});

app.get("/allHoldings", async (req, res) => {
  console.log("GET /allHoldings");
  let userEmail = req.query.user || "default";
  if (isMock) {
    console.log("Returning mock holdings");
    return res.json(mockHoldings);
  }
  let allHoldings = await HoldingsModel.find({ user: userEmail });
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  console.log("GET /allPositions");
  let userEmail = req.query.user || "default";
  if (isMock) {
    console.log("Returning mock positions");
    return res.json(mockPositions);
  }
  let allPositions = await PositionsModel.find({ user: userEmail });
  res.json(allPositions);
});

app.get("/allOrders", async (req, res) => {
  console.log("GET /allOrders");
  let userEmail = req.query.user || "default";
  if (isMock) {
    console.log("Returning mock orders");
    return res.json(mockOrders);
  }
  let allOrders = await OrdersModel.find({ user: userEmail });
  res.json(allOrders);
});



app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    console.log("New order:", { name, qty, price, mode });

    if (isMock) {
      mockOrders.push({
        name,
        qty: Number(qty),
        price: Number(price),
        mode
      });


      // Update mock holdings
      let existingHolding = mockHoldings.find(h => h.name === name);
      if (mode === "BUY") {
        if (existingHolding) {
          let newQty = existingHolding.qty + Number(qty);
          existingHolding.avg = (existingHolding.avg * existingHolding.qty + Number(price) * Number(qty)) / newQty;
          existingHolding.qty = newQty;
          existingHolding.price = Number(price);
        } else {
          mockHoldings.push({
            name,
            qty: Number(qty),
            avg: Number(price),
            price: Number(price),
            net: "+0.00%",
            day: "+0.00%",
          });
        }
      } else if (mode === "SELL") {
        if (existingHolding) {
          existingHolding.qty -= Number(qty);
          if (existingHolding.qty <= 0) {
            const index = mockHoldings.indexOf(existingHolding);
            mockHoldings.splice(index, 1);
          }
        }
      }

      // Update mock positions (simplified)
      let existingPosition = mockPositions.find(p => p.name === name);
      if (mode === "BUY") {
        if (existingPosition) {
          existingPosition.qty += Number(qty);
          existingPosition.price = Number(price);
        } else {
          mockPositions.push({
            product: "CNC",
            name,
            qty: Number(qty),
            avg: Number(price),
            price: Number(price),
            net: "+0.00%",
            day: "+0.00%",
            isLoss: false,
          });
        }
      } else if (mode === "SELL") {
        if (existingPosition) {
          existingPosition.qty -= Number(qty);
          if (existingPosition.qty <= 0) {
            const index = mockPositions.indexOf(existingPosition);
            mockPositions.splice(index, 1);
          }
        }
      }

      return res.status(200).json({ message: "Order processed (Mock Mode)!", status: "success" });
    }


    let userEmail = req.body.user || "default";
    let newOrder = new OrdersModel({ name, qty, price, mode, user: userEmail });

    await newOrder.save();

    // Update Holdings
    let existingHolding = await HoldingsModel.findOne({ name, user: userEmail });
    if (mode === "BUY") {
      if (existingHolding) {
        let newQty = existingHolding.qty + Number(qty);
        let newAvg = (existingHolding.avg * existingHolding.qty + Number(price) * Number(qty)) / newQty;
        await HoldingsModel.updateOne({ _id: existingHolding._id }, { qty: newQty, avg: newAvg, price: Number(price) });
      } else {
        let newHolding = new HoldingsModel({
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
          net: "+0.00%",
          day: "+0.00%",
          user: userEmail,
        });
        await newHolding.save();
      }
    } else if (mode === "SELL") {
      if (existingHolding) {
        let newQty = existingHolding.qty - Number(qty);
        if (newQty <= 0) {
          await HoldingsModel.deleteOne({ _id: existingHolding._id });
        } else {
          await HoldingsModel.updateOne({ _id: existingHolding._id }, { qty: newQty });
        }
      }
    }

    // Update Positions (Intraday)
    let existingPosition = await PositionsModel.findOne({ name, user: userEmail });
    if (mode === "BUY") {
      if (existingPosition) {
        let newQty = existingPosition.qty + Number(qty);
        await PositionsModel.updateOne({ _id: existingPosition._id }, { qty: newQty, price: Number(price) });
      } else {
        let newPosition = new PositionsModel({
          product: "CNC",
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
          net: "+0.00%",
          day: "+0.00%",
          isLoss: false,
          user: userEmail,
        });
        await newPosition.save();
      }
    } else if (mode === "SELL") {
      if (existingPosition) {
        let newQty = existingPosition.qty - Number(qty);
        if (newQty <= 0) {
          await PositionsModel.deleteOne({ _id: existingPosition._id });
        } else {
          await PositionsModel.updateOne({ _id: existingPosition._id }, { qty: newQty });
        }
      }
    }

    res.send("Order processed and portfolio updated!");
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).send("Error processing order");
  }
});

app.get("/clearHoldings", async (req, res) => {
  await HoldingsModel.deleteMany({});
  await PositionsModel.deleteMany({});
  await OrdersModel.deleteMany({});
  await UserModel.deleteMany({});
  res.send("Everything cleared!");
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Signup attempt:", { username, email });

    if (isMock) {
      if (mockUsers.find(u => u.username === username)) return res.status(400).json({ error: "Username already exists" });
      if (mockUsers.find(u => u.email === email)) return res.status(400).json({ error: "Email already exists" });
      mockUsers.push({ username, email, password });
      console.log("User saved to mock successfully");
    } else {
      const newUser = new UserModel({ username, email, password });
      await newUser.save();
      console.log("User saved successfully");
    }


    // Auto-cleanup removed to maintain per-user data


    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    console.error("Signup error details:", error);
    if (error.code === 11000) {
      if (error.keyPattern.username) {
        return res.status(400).json({ error: "Username already exists" });
      }
      if (error.keyPattern.email) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }
    res.status(500).json({ error: "Error signing up user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email });

    let user;
    if (isMock) {
      user = mockUsers.find(u => u.email === email);
    } else {
      user = await UserModel.findOne({ email });
    }

    if (!user) {

      console.log("User not found:", email);
      return res.status(400).json({ error: "User not found" });
    }
    if (user.password !== password) {
      console.log("Invalid password for:", email);
      return res.status(400).json({ error: "Invalid password" });
    }

    // Auto-cleanup removed to maintain per-user data


    console.log("Login successful for:", email);
    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Login error details:", error);
    res.status(500).json({ error: "Error logging in user" });
  }
});

// Catch-all route for Dashboard to handle React Router
app.get("/dashboard*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dashboard/build", "index.html"));
});

// Catch-all route for Frontend to handle React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, async () => {
  console.log(`🚀 App started on port ${PORT}!`);
  try {
    console.log("🛠️ Attempting to connect to MongoDB...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000, // Increased timeout to 8 seconds
    });
    console.log("✅ DB connected successfully!");
    await UserModel.syncIndexes();
  } catch (error) {
    console.error("❌ DB connection error:", error.message);

    if (error.message.includes("ENOTFOUND")) {
      console.error("🔍 SUGGESTION: DNS resolution failed. Your ISP (Reliance/Jio?) might be blocking MongoDB SRV records.");
    } else if (error.message.includes("ECONNREFUSED")) {
      console.error("🔍 SUGGESTION: Connection refused. Please ensure your IP address is whitelisted in MongoDB Atlas (Network Access).");
    } else if (error.code === 8000) {
      console.error("🔍 SUGGESTION: Authentication failed. Please check your DB credentials in the .env file.");
    }

    console.warn("⚠️  FALLBACK: Running in Mock Database Mode. Changes will not be persisted to MongoDB.");
    isMock = true;
  }
});
