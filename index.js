const express = require('express');
require('dotenv').config();
require('./db/config');

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));

// ROUTES
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.get("/", (req, res) => {
    res.send("Hello! The app is running 🚀");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
