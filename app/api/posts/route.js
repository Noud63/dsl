import connectDB from "@/connectDB/database";
import cloudinary from "@/config/cloudinary";
import Posts from "@/models/posts";
import Users from "@/models/Users";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request) => {

  try {
    await connectDB();

    const formData = await request.formData();
    
    const sessionUser = await getSessionUser();
    console.log(sessionUser.user.name)

if (!sessionUser || !sessionUser.user.id) {
  return new Response("User ID is required", { status: 401 });
}

   const {
     user: { name, email, image, id, username, avatar },
     userId,
   } = sessionUser;


     const content = formData.get("postContent")
    const images = formData.getAll("images").filter((image) => image.name !== ""); //prevent error cloudinary 


    const postData = {
      postContent: content,
      user: userId,
      username: username,
      name: name,
      images
    }

    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //Convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      //Make request to upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "nextjs_blog" }
      );

      imageUploadPromises.push(result.secure_url);

      //Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      //Add uploaded images to the post 
      postData.images = uploadedImages;
    }

    // console.log(postData);

      const newPost = new Posts(postData);
      await newPost.save();

    return new Response(JSON.stringify(postData), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Failed to add post", { status: 500 });
  }
 
};


export const GET = async (request) => {

  try {
    await connectDB();

    const posts = await Posts.find({})
    console.log(posts)
     return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error)
  }
}
    
