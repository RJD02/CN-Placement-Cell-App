import mongoose from "mongoose";

const db = async () => {
  try {
    mongoose.set("debug", true);
    await mongoose.connect("mongodb://localhost:27017/placement-cell");
    const db = mongoose.connection;
    db.on("error", () => console.error("Connection error"));
    console.log("Database connected");
    return db;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default db;
