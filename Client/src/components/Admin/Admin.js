import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPublicPlaylistsList from "../AdminPublicPlaylistList/AdminPublicPlaylistList";
import AdminProfile from "./AdminProfile";
import "./Admin.css";

export default function Admin() {
  const [auth, setAuth] = useState([]);
  const [items, setItems] = useState([]);
  const [DataisLoaded, setLoading] = useState(false);
  const history = useNavigate();
  
  useEffect(() => {
    fetchData();
  }, []);

  //Fetch all User data
  function fetchData() {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setLoading(true);
      });
  }

  //make all users displayable
  function mapData() {
    const newMap = [];
    const userDiv = document.getElementById("users-context");
    while (userDiv.firstChild) {
      userDiv.removeChild(userDiv.firstChild);
    }
    items.map((item) => {
      newMap.push(item);
    });
    /*
    for (var j = 0; j < newMap.length; j++) {
      displayUser(newMap, userDiv, j);
    }
    */
  }

  if (!DataisLoaded) {
    return (
      <div>
        {" "}
        <h1 className="text-white fs-5"> loading.... </h1>{" "}
      </div>
    );
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function giveAdmin(userid){
      fetch(`/api/users/giveadmin/${userid}`, {
        method: "POST",
      });
      console.log(userid + " was given admin");
      refreshPage();
  }

  function removeAdmin(userid){
      fetch(`/api/users/removeadmin/${userid}`, {
        method: "POST",
      });
      console.log(userid + " was revoked admin privliges");
      refreshPage();
  }

  function disableUser(userID){
      fetch(`/api/users/setdisabled/${userID}`, {
        method: "POST",
      });
      console.log(userID + " was disabled");
      refreshPage();
  }

  function enableUser(userID){
      fetch(`/api/users/removedisabled/${userID}`, {
        method: "POST",
      });
      console.log(userID + " was enabled");
      refreshPage();
  }

  return (
    <div className="dash-container">
      <AdminPublicPlaylistsList></AdminPublicPlaylistsList>
      <div className="view-users-container">
        <h3>Users:</h3>
        <div id="users-context" >{
          items.map((item)=>(
            <div className="user-container">
              <div><strong>{item.email} </strong></div>
              <div>Admin: {(item.isAdmin).toString()} | Disabled: {(item.disabled).toString()}</div>
              <div className="user-btns">
                <button onClick={()=>giveAdmin(item.uid)}>Give Admin</button>
                <button onClick={()=> removeAdmin(item.uid)}>Remove Admin</button>
              </div>
                <div className="user-btns">
                <button onClick={()=> disableUser(item.uid)}>Disable User</button>
                <button onClick={() => enableUser(item.uid)}>Enable User</button>
              </div>
            </div>
          ))
        }
        </div>
      </div>
      <div>
        <AdminProfile></AdminProfile>
        <Link to="/privacy">Update Privacy Policy</Link>
        <p></p>
        <Link to="/aup">Update Acceptable User Policy</Link>
        <p></p>
        <Link to='/DMCA'>DMCA Policy</Link>
      </div>
    </div>
  );
}
