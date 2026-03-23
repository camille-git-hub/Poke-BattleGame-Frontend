import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/api.js";

const Navbar = () => {
    const { isAuthenticated, email, logoutUser: logoutFromContext } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        logoutFromContext();
        navigate("/login");
    }

    return (
        <nav className="bg-yellow-600 border-b border-yellow-500 shadow-md text-white p-4">
            <div className="container p-4 mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Pokemon Battleground</h1>
                <div className="p-4 space-x-4">
                    <a href="/" className="hover:underline">Home</a>
                    {isAuthenticated ? (
                        <>
                            <a href="/roster" className="hover:underline">Roster</a>
                            <a href="/battle" className="hover:underline">Battle</a>
                            <a href="/leaderboard" className="hover:underline">Leaderboard</a>
                            <button 
                                onClick={() => navigate("/leaderboard")}
                                className="hover:underline cursor-pointer"
                            >
                                {email}
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="hover:underline cursor-pointer"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="hover:underline">Login</a>
                            <a href="/register" className="hover:underline">Sign Up</a>
                            <a href="/roster" className="hover:underline">Roster</a>
                            <a href="/battle" className="hover:underline">Battle</a>
                            <a href="/leaderboard" className="hover:underline">Leaderboard</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;