import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB connected successsfully");
    });

    connection.on("error", (err) => {
      console.log("DB connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while connecting to db ", error);
  }
}
