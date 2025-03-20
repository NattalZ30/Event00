import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI || "mongodb+srv://nattalz:4aLRQ0gLK113PoPf@event00.ejm6r.mongodb.net/?retryWrites=true&w=majority&appName=Event00";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
}

app.post("/api/findUser", async (req, res) => {
  try {
    await connectDB();
    const { username, password } = req.body;
    const usersCollection = client.db("users_test").collection("users");
    const user = await usersCollection.findOne({ username, password });

    if (user) {
      return res.json({ success: true, message: "User found" });
    } else {
      return res.json({ success: false, message: "No matching user found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/createUser", async (req, res) => {
  try {
    await connectDB();
    const { username, email, password } = req.body;
    const usersCollection = client.db("users_test").collection("users");
    const newUser = await usersCollection.insertOne({ username, email, password });

    return res.json({ success: true, userId: newUser.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/findEventsByEmail", async (req, res) => {
  try {
    await connectDB(); 
    const detailsCollection = client.db("events").collection("tickets");
    const {email} = req.body
    const events = await detailsCollection.find({email}).toArray();

    if (events.length > 0) {
      return res.json({ success: true, events });
    } else {
      return res.json({ success: false, message: "No events found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/findEvents", async (req, res) => {
  try {
    await connectDB(); 
    const detailsCollection = client.db("events").collection("details");

    // Retrieve all events and convert them to an array
    const events = await detailsCollection.find().toArray();

    if (events.length > 0) {
      return res.json({ success: true, events });
    } else {
      return res.json({ success: false, message: "No events found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/findEventsByUser", async (req, res) => {
  try {
    await connectDB();
    const { username } = req.body;
    const eventsCollection = client.db("events").collection("details");

    // Fetch all events for the given username
    const events = await eventsCollection.find({ username }).toArray();

    if (events.length > 0) {
      return res.json({ success: true, events });
    } else {
      return res.json({ success: false, message: "No events found for this user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/createEvent", async (req, res) => {
  try {
    await connectDB();
    const { title, description, date, time, location, posted_by } = req.body; 

    // Validate required fields
    if (!title || !description || !date || !time) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const event_id = Date.now().toString();
    const eventsCollection = client.db("events").collection("details");
    const newEvent = await eventsCollection.insertOne({ event_id, title, description, date, time, location, posted_by });

    return res.json({ success: true, eventId: newEvent.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/addTicket", async (req, res) => {
  try {
    await connectDB();
    const { fullName, email, event } = req.body; // Accept only fullName & email

    if (!fullName || !email) {
      return res.status(400).json({ success: false, message: "Full name and email are required" });
    }

    const ticketsCollection = client.db("events").collection("tickets");
    const newTicket = await ticketsCollection.insertOne({ fullName, email, event });

    return res.json({ success: true, ticketId: newTicket.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/event/:event_id", async (req, res) => {
  try {
    await connectDB();
    const { event_id } = req.params;
    const eventsCollection = client.db("events").collection("details");

    const event = await eventsCollection.findOne({ event_id });

    if (event) {
      return res.json({ success: true, event });
    } else {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/event/:event_id", async (req, res) => {
  try {
    await connectDB();
    const { event_id } = req.params;
    const eventsCollection = client.db("events").collection("details");

    // Delete the event by event_id
    const result = await eventsCollection.deleteOne({ event_id });

    if (result.deletedCount === 1) {
      return res.json({ success: true, message: "Event deleted successfully" });
    } else {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
