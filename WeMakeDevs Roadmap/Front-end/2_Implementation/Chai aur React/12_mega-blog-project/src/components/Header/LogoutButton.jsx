
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogoutButton() {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.status);

    const logoutHandler = () => {
        authService.logout()
        .then(() => dispatch(logout()))
        .catch(error => console.log("Logout Error:", error))
    }

    return isLoggedIn?
    (
        <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
            Logout
        </button>
    )
    : null;
}

export default LogoutButton;