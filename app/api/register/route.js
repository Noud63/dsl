import connectDB from "@/connectDB/database";
import Users from "@/models/Users";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export const POST = async (request) => {
try {
       await connectDB();
    const { name, email, username, password } = await request.json();

    const user = await Users.findOne({ email: email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if(user){
        return new Response(JSON.stringify({ message: "User already exist!" }),{status: 409,});
    }

    if(!user){
        const newUser = await Users.create({
        email: email,
        name: name,
        username: username,
        password: hashedPassword,
      });

    // console.log(newUser)
    
      return new Response(JSON.stringify(newUser), {status: 200});
    }


} catch (error) {
     console.log(error);
     return new Response("Something went wrong!", { status: 500 });
}
}