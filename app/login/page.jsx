"use client";
import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { CircleX } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginPage = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
   
  const router = useRouter();

  const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const res = await signIn("credentials", {
       email,
       password,
       redirect: false,
     });

     if (res.status === 200) {
       setSuccess(true);
       setTimeout(() => {
         router.push("/");
       }, 3000);
     }

     if (!res.ok) {
       setError(true);
       setTimeout(() => {
         setError(false);
       }, 2000);
     }
   } catch (error) {
     console.log(error, { message: error.message });
   } finally {
     setEmail("");
     setPassword("");
   }
 };

  return (
    <div className="w-full mx-auto mt-4 px-4">
      <div className="p-6 rounded-lg shadow-md w-full max-w-[680px] mx-auto bg-white">
        <div className="flex justify-center text-xl text-green-900 font-bold mb-4 border-b-2 border-dotted border-green-900 pb-4">
          Log in
        </div>

        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label
              className="block text-green-900 text-md font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-green-900 text-md font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="w-full flex flex-row items-center px-4 py-3 rounded-md bg-red-100">
              <CircleX size={20} color="darkred" className="mr-2" />
              <span className="text-red-800">{message}</span>
            </div>
          )}

          {success && (
            <div className="w-full flex flex-row items-center px-4 py-2 rounded-md bg-green-100 mb-2">
              <CircleCheckBig size={20} color="green" className="mr-2" />
              <span className="text-green-600">Je bent ingelogd!</span>
            </div>
          )}

          <div className="mt-4 mb-4">
            <button
              className="bg-gradient-to-r from-green-950 via-green-700 to-green-950 text-white text-md py-6 rounded-lg w-full flex items-center justify-center"
              type="submit"
            >
              <SendHorizontal className="mr-2" /> Log in
            </button>
          </div>

          <div className="w-full mt-4 flex items-center gap-1 font-medium text-green-900">
           Nog geen account? <ArrowRight size={16} />
            <Link href="/register">Registreer</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
