import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB conneted successfully...");
    });

    connection.on("error", (err) => {
      console.log("DB Connection error!", err);
      process.exit();
    });
    
  } catch (error: any) {
    console.log(error.message);
    
  }
}
