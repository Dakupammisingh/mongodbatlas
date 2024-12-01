// app/api/addData/route.js
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { name, email } = await req.json(); // Get data from the request body

    // Connect to MongoDB
    const db = await connectToDatabase();

    // Insert data into a collection
    const result = await db.collection("users").insertOne({ name, email });

    return new Response(
      JSON.stringify({ message: "Data added successfully!", result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding data:", error);
    return new Response(JSON.stringify({ error: "Failed to add data" }), {
      status: 500,
    });
  }
}
