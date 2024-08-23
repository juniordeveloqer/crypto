import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI; // .env dosyanızda URI'yi saklayın
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  try {
    // MongoDB'ye bağlan
    await client.connect();
    res.status(200).json({ message: "MongoDB'ye başarıyla bağlandı!" });
  } catch (error) {
    res.status(500).json({ error: "Bağlanılamadı: " + error.message });
  } finally {
    await client.close();
  }
}