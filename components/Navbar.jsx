"use client"
import React from 'react'
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {

  const { data: session, status } = useSession();

  return (
    <div className="w-full max-w-[680px] flex justify-center m-auto pt-2 pb-4 flex-col gap-2">
      <Link href="/">
        <span className="text-white text-6xl font-CloisterBlack tracking-widest flex justify-center items-center py-4">
          S t a a t s l i e d e n
        </span>
      </Link>

      <div className="w-full flex flex-row justify-between items-center py-2 text-white bg-gradient-to-r from-green-950 via-green-700 to-green-950 rounded-lg">
        <Link href="/register" className="w-1/2 flex justify-start py-2 pl-4">
          Maak een account
        </Link>

        <div className="flex w-1/3">
          {!session?.user ? (
            <Link href="/login" className="w-full flex justify-end pr-4 py-2">
              Inloggen
            </Link>
          ) : (
            <span className="w-[220px] flex justify-center items-center ">{`Hi, ${session?.user?.username}`}</span>
          )}
          {session?.user && <button
            className="w-full flex justify-center py-2"
            onClick={() => {
              signOut({ callbackUrl: "/", redirect: true });
            }}
          >
            <span>Uitloggen</span>
          </button>}
        </div>
      </div>
    </div>
  );
}

export default Navbar
