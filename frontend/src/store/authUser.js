import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'
 
export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({isSigningUp: true})
        try {
            const res = await axios.post("/api/v1/auth/signup", credentials)
            set({ user: res.data.user, isSigningUp: false })
            toast.success("Account created")
        } catch (error) {
            set({user: null, isSigningUp: false})
            toast.error(error.response.data.error || "An error occurred")
        }
     },
    logout: async () => { 
        set({isLoggingOut: true})
        try {
            await axios.post('/api/v1/auth/logout')
            set({ user: null, isLoggingOut: false })
            toast.success("logout successful")
        } catch (error) {
            set({ user: null, isLoggingOut: false })
            toast.error(error.response.data.error)
        }
    },
    login: async (credentials) => { 
        set({isLoggingIn: true})
        try {
            const res = await axios.post('/api/v1/auth/login', credentials)
            set({ user: res.data.user, isLoggingIn: false })
            toast.success("Login successful")
        } catch (error) {
            set({ user: null, isLoggingIn: false })
            toast.error(error.response.data.error || "Login failed")
        }
    },
    authCheck: async () => { 
        try {
            const res = await axios.get("/api/v1/auth/authCheck")
            set({user: res.data.user, isCheckingAuth: false})
        } catch (error) {
            set({ user: null, isCheckingAuth: false })
        }
    }
}) )