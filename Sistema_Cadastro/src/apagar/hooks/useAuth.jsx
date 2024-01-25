import { useContext} from "react";
import { AuthContext} from "../Context/auth";

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export default useAuth;