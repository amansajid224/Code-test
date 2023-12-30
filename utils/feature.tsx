// Import the mongoose library for MongoDB interaction
import mongoose from 'mongoose';
import jwt from "jsonwebtoken"


// Function to connect to the MongoDB database
export const connectDb = async () => {
    try {
        // Attempt to connect to the database using the provided URL or an empty string
        const { connection } = await mongoose.connect(process.env.MONGO_URL || "", {
            dbName: 'Task', // Specify the name of the database
        });

        // Log a message indicating successful database connection
        console.log(`Database is connected with ${connection.host}`);
    } catch (error) {
        // Log an error message if there's an issue connecting to the database
        console.log(`Error while connected to database: ${error}`);
    }
};

// Function to fetch data from a specified API endpoint
export const getData = async () => {
    try {
        // Use the fetch API to make a GET request to the specified API endpoint
        const resp = await fetch('https://code-demo-smoky.vercel.app/api/users', {
            cache: "no-cache", // Specify caching options
        });

        // Parse the response data as JSON
        const data = await resp.json();

        // Check if the data is available; if not, return an empty array
        if (!data) {
            return [];
        }
        // Return the fetched data
        return data;
    } catch (error) {
        // Log an error message if there's an issue fetching data
        console.log(error);

        // Return an empty array in case of an error
        return [];
    }
};



export const genrateToken = (_id: string): string => {
    return jwt.sign({ _id }, process.env.JWT_SECRET || '');
};