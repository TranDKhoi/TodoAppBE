const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
var bodyParser = require("body-parser")
const morgan = require("morgan")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth")

dotenv.config()

//connect database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
})
.then(() => {
    console.log('Connected to the database!');
})
.catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});


app.use(bodyParser.json({ limit: "50mb" }))
app.use(cors())
app.use(morgan('dev'));

//APPLY ROUTES FOR APP
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "hello"
    })
})


app.all('*', (req, res, next) => {
    const error = new Error(
        `Can't find ${req.originalUrl} on this server`
    );
    next(error);
});

app.use((err, req, res, next) => {
    console.log('Check error', err.message);
    let error = Object.create(err);
    res.status(error.statusCode || 500).json({
        success: false,
        statusCode: error.statusCode || 500,
        message: error.message || 'Server error',
    });
});
app.listen(process.env.PORT || 8000, () => {
    console.log("server is running on port 8000...")
})