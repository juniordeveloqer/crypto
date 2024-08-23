import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI; // Ensure this is set in your environment variables

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!MONGO_URI) {
    throw new Error("Missing MongoDB connection string");
  }

  try {
    cachedClient = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // MongoDB bağlantı durumlarını dinleme
    mongoose.connection.on("connected", () => {
      console.log("MongoDB bağlantısı başarılı!");
    });

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB bağlantı hatası:", error.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB bağlantısı kesildi.");
    });

    return cachedClient;
  } catch (error) {
    console.error("MongoDB bağlantı hatası:", error.message);
    throw error;
  }
}

export default connectToDatabase;
