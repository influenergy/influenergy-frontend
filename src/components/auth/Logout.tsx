"use client"
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const dispatch = useDispatch();
    const router = useRouter();
  
    const handleLogout = () => {
      dispatch(logout());
      router.push('/');
    };
  
    return <Button variant="destructive" size="sm" className="w-full" onClick={handleLogout}>Logout</Button>;
  }