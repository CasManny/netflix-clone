import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { Loader } from "lucide-react";

const Signup = () => {
  const { searchParams } = new URL(window.location)
  const emailValue = searchParams.get('email')
  const [email, setEmail] = useState(emailValue || "")
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const { signup, isSigningUp } = useAuthStore()




  const handleSubmit = async (e) => {
    e.preventDefault()
    signup({email, password, username})
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
            Sign up
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
                className="w-full px-3 text-black mt-1 border border-gray-700 rounded-md bg-tranparent p-2 focus:outline-none focus:ring"
                placeholder="you@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-100 block"
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                id="username"
                className="w-full px-3 text-black mt-1 border border-gray-700 rounded-md bg-tranparent p-2 focus:outline-none focus:ring"
                placeholder="casmanny"
                onChange={(e) => setUsername(e.target.value)}
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
                className="w-full text-black  px-3 mt-1 border border-gray-700 rounded-md bg-tranparent p-2 focus:outline-none focus:ring"
                placeholder="**********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full py-2 text-white font-semibold bg-red-600 rounded-md hover:bg-red-700">
              { isSigningUp ? <Loader className="animate-spin" /> : "sign up"}
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?
            <Link to={'/login'} className="ml-2 text-red-500 underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
