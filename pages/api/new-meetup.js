import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb+srv://deepak:deepak123@cluster0.rgecbng.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  if (req.method === "POST") {
    const data = req.body;

    const result = await meetupCollection.insertOne(data);
    console.log(result);
    res.status(201).json({ message: "Meetup inserted" });
  }
  client.close();
};

export default handler;
