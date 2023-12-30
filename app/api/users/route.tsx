
import { NextResponse } from "next/server"
import { connectDb } from "../../../utils/feature";
import { User } from "../../../model/user";



export const GET = async () => {


    try {
        await connectDb();

        const users = await User.find({});

        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

