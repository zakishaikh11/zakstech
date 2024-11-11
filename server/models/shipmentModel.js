const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  shipment_date: { type: Date, default: Date.now },
  delivery_date: { type: Date },
  tracking_number: { type: String },
  carrier: { type: String },
});

const Shipment = mongoose.model('Shipment', shipmentSchema);
module.exports = Shipment;
