import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import API_BASE_URL from "../services/api";
import { useCookies } from "react-cookie";
import "./loginForm.css";

const LoginForm = ({ onSwitchToSignup }) => {
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const loginData = {
      NationalId: nationalId,
      Password: password,
    };

    const toastId = toast.loading("กำลังเข้าสู่ระบบ...");

    try {
      const response = await axios.post(`${API_BASE_URL}/tokens`, loginData);

      setCookie("token", response.data.token);

      toast.success(<b>เข้าสู่ระบบสำเร็จ!</b>, { id: toastId });
      navigate("/main");
    } catch (error) {
      const status = error.response?.status;

      if (status === 401) {
        toast.error(<b>เลขบัตรประชาชนหรือรหัสผ่านผิด</b>, { id: toastId });
      } else {
        toast.error(
          <b>{`เกิดข้อผิดพลาด: ${status || ""} ${error.message}`}</b>,
          { id: toastId }
        );
      }

      console.error("Login failed:", error);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <div className="login-container">
      <div>
        <h2>ลงชื่อเข้าใช้</h2>
        <p>ป้อนข้อมูลประจำตัวของคุณเพื่อเข้าถึงกิจกรรมของคุณ</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="national-id">เลขบัตรประจำตัวประชาชน:</label>
          <input
            type="text"
            inputMode="numeric"
            id="national-id"
            placeholder="1234567890123"
            maxLength={13}
            value={nationalId}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, "");
              setNationalId(onlyNums);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">รหัสผ่าน:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="ใส่รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          <p className="forgot-link">ลืมรหัสผ่าน?</p>
        </div>
        <button type="submit" className="login-button" disabled={submiting}>
          เข้าสู่ระบบ
        </button>
      </form>
      <div className="login-footer">
        <p>ยังไม่ได้เป็นสมาชิก?</p>
        <button className="register-link" onClick={onSwitchToSignup}>
          สมัครสมาชิก
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
