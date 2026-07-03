import { useAuth } from "../context/AuthContext";

export default function useAuthentication() {
  return useAuth();
}