import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Retrieves the actual state from Redux store.
import { useNavigate } from "react-router"; // Used to programmatically redirect the user.

/**
 * Route protection component.
 * 'authentication' (prop) defines the REQUIRED state (true=logged in, false=logged out).
 * Compares the required state to the actual state to determine access.
 */
function Protected({ children, authentication = true }) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    // authStatus: The ACTUAL login status from the Redux store (Source of Truth).
    const authStatus = useSelector(state => state.status);

    useEffect(() => {
        // --- Redirection Logic: (Required State vs. Actual State) ---

        // 1. Protected Route Check: Requires login (true) AND status doesn't match (e.g., user is logged out).
        if(authentication && authStatus !== authentication) {
            navigate("/login"); // Action: Redirect to login.
        }
        
        // 2. Public Route Check: Requires logout (false) AND status doesn't match (e.g., user is logged in).
        else if(!authentication && authStatus !== authentication) {
            navigate("/"); // Action: Redirect to home/dashboard.
        }
        
        setLoader(false); // Stop loader once check is complete.

    // Effect dependencies.
    }, [authStatus, navigate, authentication]);

    // Display loader during authentication check.
    if (loader) {
        return <div className="text-soft-white text-xl p-8">Loading authorization...</div>;
    }

    // Render children if the required state matches the actual state.
    return <>{children}</>;
}

export default Protected;