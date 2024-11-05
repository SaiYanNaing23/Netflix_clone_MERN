import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user : null,
    isSignUp : false,
    isCheckingAuth : true,
    isLoggingOut : false,
    isLoggingIn : false,
    signup: async (credentials) => {
        set({ isSignUp : true });
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({ user: response.data.user, isSignUp : false });
            toast.success("Account is created successfully")
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred")
            set({ user: null, isSignUp : false });
            console.error(error);
        }
    },
    login: async (credentials) => {
        set({ isLoggingIn : true})
        try {
            const response = await axios.post("/api/v1/auth/login", credentials)
            set({ user: response.data.user, isLoggingIn : false})
        } catch (error) {
            set({ user: null, isLoggingIn: false })
            toast.error(error.response.data.message || "Invalid credentials")
        }
    },
    logout: async () => {
        set({ isLoggingOut : true })
        try {
            await axios.post("/api/v1/auth/logout");
            set({ user: null, isLoggingOut : false });
            toast.success("Logged out successfully")
        } catch (error) {
            set({ isLoggingOut : false })
            toast.error(error.response.data.message || "Logout Fail.")
        }
    },
    authCheck: async () => {
        set({ isCheckingAuth : true });
        try {
            const response = await axios.get("/api/v1/auth/authCheck")
            set({ user: response.data.user, isCheckingAuth : false });
        } catch (error) {
            set({ user: null, isCheckingAuth : false });
        }
    },
}))