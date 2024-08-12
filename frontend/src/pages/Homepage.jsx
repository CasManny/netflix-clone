import React from "react";
import HomeScreen from "../components/home/HomeScreen";
import AuthScreen from "../components/home/AuthScreen";
import { useAuthStore } from "../store/authUser";

const Homepage = () => {
  const { user }= useAuthStore()

  return <div className="">{user ? <HomeScreen /> : <AuthScreen />}</div>;
};

export default Homepage;
