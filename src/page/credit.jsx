import React from "react";
import "./credit.css";
import { Github, Mail, Linkedin } from "lucide-react";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../services/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { checkTokenAndRedirect } from "../services/checkTokenValid";

const team = [
  {
    name: "ชิษณุชา ลิ้มพลาสุข",
    role: "Frontend Developer",
  },
  {
    name: "ณภัทร สิริทรัพย์กุลชัย",
    role: "Backend Developer",
  },
  {
    name: "ณัชภู หมายประทุม",
    role: "Moblie Developer",
  },
];

const Credit = () => {
  const [name, setName] = useState("");
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkTokenAndRedirect(cookie.token, navigate)) return;
    axios
      .get(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((response) => {
        setName(
          response.data.title +
            response.data.firstName +
            " " +
            response.data.lastName
        );
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <div className="credit-page">
      <Navbar name={name} />
      <h1 className="credit-title">ทีมผู้พัฒนา</h1>
      <div className="team-grid">
        {team.map((member, index) => (
          <div className="member-card" key={index}>
            <div className="avatar">{member.name[0]}</div>
            <h2>{member.name}</h2>
            <p>{member.role}</p>
            <div className="icons">
              <div>
                <Github size={20} />
              </div>
              <div>
                <Mail size={20} />
              </div>
              <div>
                <Linkedin size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="credit-footer">
        © {new Date().getFullYear()} ToDo App — Made with 💙 by Our Team
      </footer>
    </div>
  );
};

export default Credit;
