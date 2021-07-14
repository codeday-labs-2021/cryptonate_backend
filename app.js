const express = require("express");
const mongoose = require("mongoose");
const campaignRoutes = require("./routes/campaignRoutes");
const donationRoutes = require("./routes/donationRoutes");
const userRoutes = require("./routes/userRoutes");
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

//CAMPAIGN ROUTES
app.use("/api/campaigns", campaignRoutes);

//USER ROUTES
app.use("/api/users", userRoutes)

//DONATIONS ROUTES
app.use("/api/donations", donationRoutes);

//404
app.use((req, res) => {
   res.status(404).send({
       message: "404: page not found"
   })
});
