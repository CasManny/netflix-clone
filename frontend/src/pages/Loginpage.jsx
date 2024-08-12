import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { Loader } from "lucide-react";

const Loginpage = () => {
  const { login, isLoggingIn } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleSubmit = async (e) => {
    e.preventDefault()
    login({email, password})
  }
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white  text-2xl mb-4 font-bold">
            Login
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-100 block"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                className="w-full p-2 px-3 mt-1 border border-gray-700 rounded-md bg-tranparent focus:outline-none focus:ring"
                placeholder="you@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-100 block"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                value={password}
                className="w-full p-2 px-3 mt-1 border border-gray-700 rounded-md bg-tranparent focus:outline-none focus:ring"
                placeholder="**********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full py-2 text-white font-semibold bg-red-600 rounded-md hover:bg-red-700">
              {isLoggingIn ? <Loader className="animate-spin" /> : "Sign in"}
            </button>
          </form>
          <div className="text-center text-gray-400">
            Don't have an account?
            <Link to={'/signup'} className="ml-2 text-red-500 underline">create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
