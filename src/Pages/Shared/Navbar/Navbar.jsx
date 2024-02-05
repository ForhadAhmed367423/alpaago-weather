import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"
import { FaHome } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { useContext } from "react";
import { Authcontext } from "../../../AuthProviders/AuthProvider";
import { IoIosLogOut } from "react-icons/io";


const Navbar = () => {
    const { user, logout  } = useContext(Authcontext)
    const userName = user ? user.displayName : ""
    const firstName = userName?.split(" ")[0]
    const photo =user?.photoURL;

    const handleLogout = () => {
        logout();
    }

    return (
        
            <div className="navbar">
            {/* logo section */}
            <div>
                <img  src="https://i.ibb.co/4sCbHFY/Alpaago-removebg-preview-fotor-2024020421355.png" alt="alpaago logo" />
            </div>
            {/* Route section */}
            <div>
                <ul>
                    <li><NavLink to={'/'}><span><FaHome/> <span>Home</span></span></NavLink></li>
                    <li><NavLink to={'/manageuser'}><span><FaUsersCog/> <span>Manage User</span></span></NavLink></li>
                </ul>
            </div>

            {/* login/Singup route */}
            {
                user ?
                <div className="navlog">
                    
                    <div className="userDisplayPicture">
                                    <img src={photo} alt="" />
                                </div>
                                <div className="userInfo">
                                    <p style={{ fontWeight: "800" }}>Hello,{firstName}</p>
                                    <p>See Weather</p>
                                </div>
                    
                <button onClick={handleLogout} className="logout text-white text-lg flex items-center gap-2 ">Logout <IoIosLogOut/></button>

            </div> :
            <div className="navlog">
            <Link to={'/login'}>Login</Link>
            <p>|</p>
            <Link>Register</Link>
        </div>


            }
        </div>
    );
};

export default Navbar;