import { slide as Menu } from "react-burger-menu";
import "./sidebar.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [, , removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeCookie("token");
        navigate("/login", { replace: true });
    };

    return (
        <Menu right>
            <a className="menu-item" href="/main">
                หน้าหลัก
            </a>
            <a className="menu-item" href="/credit">
                รายชื่อสมาชิกในกลุ่ม
            </a>
            <button className="menu-item" onClick={handleLogout}>
                ออกจากระบบ
            </button>
        </Menu>
    );
};

export default Sidebar;
