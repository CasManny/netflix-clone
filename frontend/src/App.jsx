import { Navigate, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Loginpage from "./pages/Loginpage"
import Signup from "./pages/Signup"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import Watchpage from "./pages/Watchpage"
import Searchpage from "./pages/Searchpage"
import SearchHistory from "./pages/SearchHistory"

function App() {
  const { authCheck, user, isCheckingAuth } = useAuthStore()
  useEffect(() => {
    authCheck()
  }, [user])

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center h-full bg-black">
          <Loader2 className="animate-spin text-red-600 w-10 h-10" />
        </div>
      </div>
    )
  }
  return (
    <>
      <Routes>  
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={!user ? <Loginpage />: <Navigate to={'/'} />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path="/watch/:id" element={user ? <Watchpage /> : <Navigate to='/login' />} />
        <Route path="/search" element={user ? <Searchpage /> : <Navigate to='/login' />} />
        <Route path="/history" element={user ? <SearchHistory /> : <Navigate to='/login' />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
