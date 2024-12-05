const { config } = require("dotenv");
const { connect } = require("mongoose");

config();

const connectDatabase = async () => {
  try {
    connect(process.env.DB_CONNECTION);
    console.log("Database Connection is Success");
  } catch (error) {
    console.log("Database Connection is Failed");
    console.log(error);
  }
};

connectDatabase();
