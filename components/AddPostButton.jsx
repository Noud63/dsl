"use client"
import React,{useState} from 'react'
import AddPostModal from './AddPostModal';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from 'next/link';

const AddPostButton = () => {

   const [inView, setInView] = useState(false);

   const router = useRouter();

  const { data: session, status } = useSession();
  // console.log(session);
   const name = session?.user?.username;

   const showAddPostModal = () => {
    console.log("Works!")
     if (name) {
       setInView(!inView);
     } else {
       router.push("/login");
     }
   };
  return (
    <>
      <button
        className="w-full h-[40px] bg-slate-200 rounded-full pl-4 outline-none flex items-center text-gray-500 cursor-pointer"
        onClick={showAddPostModal}
      >
        {session?.user
          ? `Wat wil je met ons delen, ${name}?`
          : "wat wil je met ons delen?"}
      </button>
      <AddPostModal inView={inView} setInView={setInView}/> 
    </>
  );
}

export default AddPostButton
