import React, { useEffect, useState } from "react";
import "./main.css";
import Navbar from "../components/navbar";
import MaterialTable from "@material-table/core";
import { toast } from "react-hot-toast";
import axios from "axios";
import API_BASE_URL from "../services/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { checkTokenAndRedirect } from "../services/checkTokenValid";

const Main = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: (
        <div className="animate-pulse">
          <div className="box-loading"></div>
        </div>
      ),
      when: (
        <div className="animate-pulse">
          <div className="box-loading"></div>
        </div>
      ),
    },
    {
      id: 2,
      name: (
        <div className="animate-pulse">
          <div className="box-loading"></div>
        </div>
      ),
      when: (
        <div className="animate-pulse">
          <div className="box-loading"></div>
        </div>
      ),
    },
    {
      id: 3,
      name: (
        <div className="animate-pulse">
          <div className="box-loading"></div>
        </div>
      ),
      when: (
        <div className="animate-pulse">
          <div className="box-loading"></div>
        </div>
      ),
    },
    {
      id: 4,
      name: (
        <div className="animate-pulse">
          <div className="box-loading"></div>
        </div>
      ),
      when: (
        <div className="animate-pulse">
          <div className="box-loading"></div>
        </div>
      ),
    },
    {
      id: 5,
      name: (
        <div className="animate-pulse">
          <div className="box-loading"></div>
        </div>
      ),
      when: (
        <div className="animate-pulse">
          <div className="box-loading"></div>
        </div>
      ),
    },
  ]);
  const [cookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (!checkTokenAndRedirect(cookie.token, navigate)) return;
    axios
      .get(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
    axios
      .get(`${API_BASE_URL}/activities`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
    setLoading(false);
  }, []);

  const handleAddTask = async (newData) => {
    if (!checkTokenAndRedirect(cookie.token, navigate)) return;
    await toast
      .promise(
        axios.post(`${API_BASE_URL}/activities`, newData, {
          headers: { Authorization: `Bearer ${cookie.token}` },
        }),
        {
          loading: "กำลังเพิ่มกิจกรรม...",
          success: "เพิ่มกิจกรรมสำเร็จ!",
          error: "ไม่สามารถเพิ่มกิจกรรมได้",
        }
      )
      .then((response) => {
        const newTask = { id: response.data.id, ...newData };
        setTasks((prevTasks) => [...prevTasks, newTask]);
      });
  };

  const handleUpdateTask = async (newData, oldData) => {
    if (!checkTokenAndRedirect(cookie.token, navigate)) return;
    await toast
      .promise(
        axios.put(
          `${API_BASE_URL}/activities/${oldData.id}`,
          { name: newData.name, when: newData.when },
          {
            headers: { Authorization: `Bearer ${cookie.token}` },
          }
        ),
        {
          loading: "กำลังบันทึกการแก้ไข...",
          success: "แก้ไขกิจกรรมสำเร็จ!",
          error: "ไม่สามารถแก้ไขกิจกรรมได้",
        }
      )
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === oldData.id ? newData : task))
        );
      });
  };

  const handleDeleteTask = async (oldData) => {
    if (!checkTokenAndRedirect(cookie.token, navigate)) return;
    await toast
      .promise(
        axios.delete(`${API_BASE_URL}/activities/${oldData.id}`, {
          headers: { Authorization: `Bearer ${cookie.token}` },
        }),
        {
          loading: "กำลังลบกิจกรรม...",
          success: "ลบกิจกรรมสำเร็จ!",
          error: "ไม่สามารถลบกิจกรรมได้",
        }
      )
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== oldData.id)
        );
      });
  };

  return (
    <div className="main-page">
      <Navbar
        name={
          userData.length != 0
            ? userData.title + userData.firstName + " " + userData.lastName
            : ""
        }
      />
      <div className="material-table-wrapper">
        <MaterialTable
          title="กิจกรรมของฉัน"
          columns={[
            { title: "กิจกรรม", field: "name" },
            {
              title: "วันเวลา",
              field: "when",
              type: "datetime",
              render: (rowData) => {
                if (!rowData.when) return null;

                const taskDate = new Date(rowData.when);
                const isValidDate = !isNaN(taskDate.getTime());
                const now = Date.now();
                const isPast = isValidDate && taskDate.getTime() < now;

                return (
                  <span style={{ color: isPast ? "#f22020" : "inherit" }}>
                    {isValidDate ? taskDate.toLocaleString() : rowData.when}
                  </span>
                );
              },
            },
          ]}
          data={tasks}
          editable={{
            isEditable: () => !loading,
            isDeletable: () => !loading,
            onRowAdd: (newData) =>
              !loading
                ? new Promise((resolve) => {
                    handleAddTask(newData);
                    resolve();
                  })
                : Promise.reject(),
            onRowUpdate: (newData, oldData) =>
              !loading
                ? new Promise((resolve) => {
                    handleUpdateTask(newData, oldData);
                    resolve();
                  })
                : Promise.reject(),
            onRowDelete: (oldData) =>
              !loading
                ? new Promise((resolve) => {
                    handleDeleteTask(oldData);
                    resolve();
                  })
                : Promise.reject(),
          }}
          options={{
            headerStyle: {
              backgroundColor: "#3b82f6",
              color: "#FFF",
              fontFamily: "Noto Sans Thai",
              fontSize: "17px",
              padding: "16px",
              whiteSpace: "nowrap",
            },
            rowStyle: {
              fontFamily: "Noto Sans Thai",
              fontWeight: "450",
              fontSize: "15px",
              transition: "color 0.25s ease",
            },
            searchFieldStyle: {
              fontFamily: "Noto Sans Thai",
              fontSize: "15px",
            },
            actionsColumnIndex: -1,
            emptyRowsWhenPaging: false,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "ไม่มีข้อมูลกิจกรรม",
              editRow: {
                deleteText: "คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรมนี้ ?",
                cancelTooltip: "ยกเลิก",
                saveTooltip: "ตกลง",
              },
              editTooltip: "แก้ไขกิจกรรม",
              deleteTooltip: "ลบกิจกรรม",
              addTooltip: "เพิ่มกิจกรรม",
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} จาก {count}",
              labelRowsPerPage: "แสดงแถวต่อหน้า:",
              firstTooltip: "หน้าแรก",
              previousTooltip: "ก่อนหน้า",
              nextTooltip: "ถัดไป",
              lastTooltip: "หน้าสุดท้าย",
            },
            toolbar: {
              searchPlaceholder: "ค้นหากิจกรรม",
            },
            header: {
              actions: "ตัวเลือก",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Main;
