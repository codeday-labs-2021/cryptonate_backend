const express = require("express");
const mongoose = require("mongoose");
const campaignRoutes = require("./routes/campaign-routes");
const donationRoutes = require("./routes/donation-routes");
const userRoutes = require("./routes/user-routes");
const walletRoutes = require("./routes/wallet-routes");
const cors = require("cors");
let path = require("path");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

mongoose.set('useFindAndModify', false);

//CONNECT TO MONGODB AND LISTEN FOR REQUESTS
const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port);
        console.log(`Listening on port ${port}...`);
    })
    .catch(err => console.log(err));

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//FOLDER
app.use("/campaigns", express.static(path.join(__dirname, "campaigns")));
app.use(express.static("campaigns"));

//CORS
const originsWhitelist = [
    'http://localhost:4200'
    //,'http://www.myproductionurl.com'
];
const corsOptions = {
    origin: function(origin, callback){
        const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials:true
}

app.use(cors(corsOptions));

//CAMPAIGN ROUTES
app.use("/api/campaigns", campaignRoutes);

//USER ROUTES
app.use("/api/users", userRoutes)

//DONATIONS ROUTES
app.use("/api/donations", donationRoutes);

app.use("/api/wallet",  walletRoutes);

//404
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use(((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message
    })
}));
