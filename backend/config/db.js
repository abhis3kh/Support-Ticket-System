const mongoose = require('mongoose');

const connectDB = async () => {
  //do something
  try {
    // connect to the database using the URI
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MongoDb connected to : ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Error : ${error.message}`.red.underline.bold);
    process.exit(1); //exit the entire process
  }
};

module.exports = {
  connectDB,
};
