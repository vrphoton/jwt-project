const mongoose  = require("mongoose");
const dotenv    = require("dotenv");
const log       = require("../middlewares/logger");

dotenv.config();

const { MONGO_URL } = process.env;

const connect = () => {
    mongoose.connect(MONGO_URL, getDBOptions())
        .then(() => {
            log.info("Successfully connected to database....");
        })
        .catch((error) => {
            log.error("An error occured while connecting to database " + error);
            process.exit(1);
        });
}

function getDBOptions() {
    return { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

module.exports = { connect };