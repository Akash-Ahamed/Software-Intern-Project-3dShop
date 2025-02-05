import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Successfully Connected To MongoDB Database");
    });
    connection.on("Error", (err) => {
      console.log(
        "MongoDB Connection Error, Make Sure DB is Up and Running:" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Error Connecting to MongoDB Database", error);
  }
}
