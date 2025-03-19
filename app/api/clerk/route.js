import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextRequest } from "next/server";


export async function POST(req) {
 const wh = new Webhook(process.env.SIGNIN_SECRET);
 const headerPayLoad = await headers();
 const svixHeaders = {
    "svix-id": headerPayLoad.get("svix-id"),
    "svix-timestamp": headerPayLoad.get("svix-timestamp"),
    "svix-signature": headerPayLoad.get("svix-signature"),
 }   
 //

 const payload = await req.json();
 const body = JSON.stringify(payload);
 const {data,type} = wh.verify(body,svixHeaders);


 const userData = {
    _id: data.id,
    name: `${data.first_name} ${data.last_name}`,
    email: data.email_addresses[0].email_addresses,
    image: data.image_url
 };
 await connectDB();

 switch(type){
    case 'user.created': 
        await User.create(userData)
        break;
    case 'user.updated':
        await User.findByIdAndUpdate(data.id,userData)
        break;
    case 'user.deleted':
        await User.findByIdAndDelete(User.id,userData)
        break;
    default:
        break;
 }
 return NextRequest.json({message: "Evenet Receive"})
}