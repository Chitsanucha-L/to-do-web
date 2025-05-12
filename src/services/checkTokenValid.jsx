import { jwtDecode } from "jwt-decode";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./customPopup.css"; // ไฟล์ CSS ที่เราจะใช้ตกแต่ง

export function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false;

    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (error) {
    return false;
  }
}

export function checkTokenAndRedirect(token, navigate) {
  if (!token || !isTokenValid(token)) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-alert">
            <h2>เซสชันหมดอายุ</h2>
            <p>กรุณาเข้าสู่ระบบใหม่เพื่อใช้งานต่อ</p>
            <button
              onClick={() => {
                navigate("/login", { replace: true });
                onClose();
              }}
            >
              ตกลง
            </button>
          </div>
        );
      },
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
    return false;
  }
  return true;
}
