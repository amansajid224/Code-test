// Import necessary modules and libraries
'use server'; // Note: Is 'server' a typo? Did you mean 'use strict' or something else?


import { redirect } from 'next/navigation'
import bcrypt from "bcrypt"
import { cookies } from 'next/headers'
import { connectDb, genrateToken } from '../utils/feature';
import { User } from '../model/user';


// Define an interface for the FormDataObject
interface FormDataObject {
  [key: string]: string ;
}

// Function to save user data to the database
export async function saveDataToDB(prevState: any, formData: any): Promise<any> {
  try {
    // Convert FormData to a plain JavaScript object
    const formDataObject: FormDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    // Extract relevant fields from the form data
    const { fullName, email, password } = formDataObject;

    // Check if required fields are present in the form data
    if (!fullName || !email || !password) {
      throw new Error(`Invalid form data`);
    }

    // Connect to the database
    await connectDb();

    // Check if the user with the same email already exists
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();
  } catch (error: any) {
    // Handle errors and throw an error with a specific message
    throw new Error(error.message);
  }

  // Redirect to the login page after successful data saving
  redirect('/login')
}

// Function to validate user credentials
export async function validateUser(prevState: any, formData: any): Promise<any> {
  try {
    // Convert FormData to a plain JavaScript object
    const formDataObject: FormDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    // Extract relevant fields from the form data
    const { email, password } = formDataObject;

    // Check if required fields are present in the form data
    if (!email || !password) {
      throw new Error(`Invalid form data`);
    }

    // Connect to the database
    await connectDb();

    // Find the user in the database by email
    let user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = genrateToken(user._id);
  
    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
    })

  } catch (error: any) {
    // Handle errors and throw an error with a specific message
    throw new Error(error.message);
  }

  // Redirect to the dashboard after successful validation
  redirect("/dashboard");
}