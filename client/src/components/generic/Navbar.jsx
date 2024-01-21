import { NavLink } from 'react-router-dom'
import { COLORS } from '@src/constants'
import { IoIosPricetags } from "react-icons/io";
import { AiOutlineLogin, AiOutlineLogout  } from "react-icons/ai";
import { BiHomeAlt2 } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { useContext } from 'react';
import { AuthContext } from '@src/context/AuthContext'
import axios from 'axios';


const Navbar = ({pageName="Expense Tracker"}) => {

    const { authenticated } = useContext(AuthContext);

    return (
        <>
        <nav className="navbar navbar-expand-sm navbar-dark mb-2 p-3" style={{backgroundColor: COLORS["FADED_BLACK"]}}>
            <div className="container-fluid">
                <div className="d-flex align-items-center" href="#">
                    <IoIosPricetags /> <span className="ms-2">{pageName}</span>
                </div>

                <div className="d-flex gap-3 align-items-center text-white">
                    { authenticated && <NavbarLink icon={<BiHomeAlt2 size={24}/>} title="Home" to="/" /> }
                    { authenticated && <NavbarLink icon={<TbReportAnalytics size={24}/>} title="Report" to="/report" /> }
                    { authenticated && <Logout /> }
                    { !authenticated && <NavbarLink icon={<AiOutlineLogin size={24}/>} title="Login" to="/login" /> }
                </div>
            </div>
        </nav>
        </>
    )
}

function NavbarLink({ icon, title, to }){
    return (
        <NavLink to={to}>
            <div className="nav-btn" title={title}>
                {icon}
            </div>
        </NavLink>
    )
}

function Logout(){
    
    async function handleLogout(){
        await axios.get("/api/");
    }

    return (
        <div className='nav-btn' title="Logout" onClick={handleLogout}>
            <AiOutlineLogout size={24} />
        </div>
    )
}

export default Navbar
