import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import API_BASE_URL from "../services/api";
import "./registerForm.css";

const RegisterForm = ({ onSwitchToLogin }) => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    if (!title || !firstName || !lastName) {
      toast.error("กรุณากรอกชื่อและนามสกุลให้ครบ");  
      setSubmiting(false);
      return;
    }

    if (nationalId.length !== 13) {
      toast.error("กรุณากรอกเลขบัตรประจำตัวประชาชน\nให้ครบ 13 หลัก");
      setSubmiting(false);
      return;
    }
    if (password.length < 8) {
      toast.error("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
      setSubmiting(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      setSubmiting(false);
      return;
    }

    const registerData = {
      NationalId: nationalId,
      Password: password,
      Title: title,
      FirstName: firstName,
      LastName: lastName,
    };

    await toast
      .promise(axios.post(`${API_BASE_URL}/Users`, registerData), {
        loading: "กำลังสมัครสมาชิก...",
        success: <b>สมัครสมาชิกสำเร็จ!</b>,
        error: <b>ไม่สามารถสมัครสมาชิกได้</b>,
      })
      .then((response) => {
        onSwitchToLogin();
      })
      .catch((error) => {
        console.error(
          "Login failed:",
          error.response.status + " " + error.response.statusText ||
            error.message
        );
      })
      .finally(() => {
        setSubmiting(false);
      });
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className="register-container">
      <h2>สมัครสมาชิก</h2>
      <p>ลงทะเบียนเพื่อเริ่มจัดการกิจกรรมของคุณ</p>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="title-name">
          <div className="form-group" style={{ gridColumn: "span 1" }}>
            <label htmlFor="title">คำนำหน้า:</label>
            <select
              value={title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled style={{ display: "none" }}></option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
          </div>
          <div className="form-group" style={{ gridColumn: "span 3" }}>
            <label htmlFor="firstName">ชื่อจริง:</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="ใส่ชื่อจริง"
              required
              autoComplete="name"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="lastName">นามสกุล:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="ใส่นามสกุล"
            required
            autoComplete="name"
          />
        </div>

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
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน:</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="password"
              placeholder="ใส่รหัสผ่าน"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>
        <button type="submit" className="register-button" disabled={submiting}>
          สมัครสมาชิก
        </button>
      </form>
      <div className="register-footer">
        <p>เป็นสมาชิกอยู่แล้ว?</p>
        <button className="login-link" onClick={onSwitchToLogin}>
          ลงชื่อเข้าใช้
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
