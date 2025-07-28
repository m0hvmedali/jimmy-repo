// backend/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-whatsapp", async (req, res) => {
  const { phone, message } = req.body;
  const apiKey = "6615912";

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url); // ✅ لاحظ: GET مش POST
    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    console.error("❌ Error sending WhatsApp message:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, () => console.log("🚀 Backend on http://localhost:3001"));
