const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  user: String,
  pnl: { type: Number, default: 0 },
});

module.exports = { OrdersSchema };
