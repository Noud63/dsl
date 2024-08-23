import { Schema, model, models } from "mongoose";

const PostsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postContent: {
      type: String,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Posts = models.Posts || model("Posts", PostsSchema);

export default Posts;
