import axios from "./axios.js";
import useAuth from "../Auth/useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            await axios('/auth/logout', {
                withCredentials: true
            });
        } catch (err) {
            // Silent fail on logout
        }
    }

    return logout;
}

export default useLogout