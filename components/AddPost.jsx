"use client";
import React, { useState } from "react";
import AddPostModal from "./AddPostModal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddPostButton from "./AddPostButton";

const AddPost = () => {
  
  const [inView, setInView] = useState(false);

  const { data: session, status } = useSession();
  // console.log(session);

  return (
    <div>
      <section className="w-full max-w-[680px] flex justify-between px-4 mx-auto bg-white py-4 rounded-lg shadow-md">
        <div className="w-full flex flex-row gap-4 items-center">
          <Image
            src={
              session?.user
                ? "https://shorturl.at/WrCNS"
                : "/images/defaultAvatar.png"
            }
            width={45}
            height={45}
            alt=""
            className="rounded-full w-[45px] h-[45px]"
          />
          <AddPostButton />
        </div>
      </section>
      <AddPostModal inView={inView} setInView={setInView} />
    </div>
  );
};

export default AddPost;
