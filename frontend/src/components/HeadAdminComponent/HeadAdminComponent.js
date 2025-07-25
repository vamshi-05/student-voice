import "./head3.css";
import "./cvr name.webp";

import { NavLink, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from 'axios'
function HeadAdmimComponent() {
   const [status,setStatus]=useState("pending")
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    navigate("/");
    return;
  };

  const [complaints,setComplaints]=useState([])
  useEffect(() => {
    const fetchData=async ()=>{
        try{
          const response= await axios.get("https://student-voice-backend.onrender.com/admin/complaints",{
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          if(response.status===200){
            setComplaints(response.data)
          }
          else{
          }
        }
        catch(error){
          console.error(error)
        }
    };
    fetchData()
    },[status]);


    const handleUpdate=async (id,nature)=>{
      try{
        const response=await axios.patch(`https://student-voice-backend.onrender.com/admin/${id}/${nature}`,{},{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        if(response.status===200){
          setStatus("solved")
          navigate("/adminhome")
        }
        else{
          alert("Unable to solve ")
          navigate("/adminhome")
        }
      }
      catch(error){
        navigate("/adminhome");
      }
    }

  return (
    <>
      <div className="head3">
        <div className="admimgcls">
        <img src={require("./cvr name.webp")} width="600" />
        </div>
        <nav className="nav-bar">
          <div className="box">
            <div className="admin"> {">Admin-Dashboard"}</div>
            <div className="box2">
              <button id="but1" onClick={() => handleLogout()}>
                logout
              </button>
            </div>
          </div>
        </nav>
        <hr />
      </div>
      
      {complaints
      .filter((complaint) => complaint.status === "pending")
      .map((complaint)=>(
          
          <div className="flex">
          <div className="card1">
            <h5>USERID : {complaint.userId}</h5>
  
            <h5>CATEGORY : {complaint.category}</h5>
            <h5> NATURE OF COMPLAINT :{complaint.nature} </h5>
            <h5> DESCRIPTION : {complaint.description} </h5>
            <h5>STATUS: {complaint.status}</h5>
            <button>View Image </button>
            
            <button id="solve" onClick={()=>handleUpdate(complaint.userId,complaint.nature)}>Solve</button>
          </div>
          <div className="view">
            <img id="complaint" src={complaint.image} alt="not found" />
            
          </div>
        </div>
      ))
      }
      {complaints
      .filter((complaint) => complaint.status === "solved")
      .map((complaint)=>(
          
          <div className="flex">
          <div className="card1">
            <h5>USERID : {complaint.userId}</h5>
  
            <h5>CATEGORY : {complaint.category}</h5>
            <h5> NATURE OF COMPLAINT :{complaint.nature} </h5>
            <h5> DESCRIPTION : {complaint.description} </h5>
            <h5>STATUS: {complaint.status}</h5>
            <button>View Image </button>
            
            <span id="solved">SOLVED</span>
          </div>
          <div className="view">
            <img id="complaint" src={complaint.image} alt="not found" />
            
          </div>
        </div>
      ))
      }
      
    </>
  );
}

export default HeadAdmimComponent;
