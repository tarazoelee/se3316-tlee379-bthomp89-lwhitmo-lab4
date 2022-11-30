import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { auth } from "firebase-admin";
import { getAuth, sendEmailVerification } from "firebase/auth";
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
    for (var j = 0; j < newMap.length; j++) {
      displayUser(newMap, userDiv, j);
    }
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

  function displayUser(newMap, userDiv, j) {
    var newContent = document.createElement("li");
    var email = document.createTextNode("Email: " + newMap[j].email + " ");
    var isAdmin = document.createTextNode(
      "isAdmin: " + newMap[j].isAdmin + " "
    );
    var disabled = document.createTextNode(
      " Disabled: " + newMap[j].disabled + " "
    );
    var userID = newMap[j].uid;

    var giveAdmin = document.createElement("button");
    giveAdmin.appendChild(document.createTextNode("Give Admin"));
    giveAdmin.addEventListener("click", function () {
      fetch(`/api/users/giveadmin/${userID}`, {
        method: "POST",
      });
      console.log(userID + " was given admin");
      refreshPage();
    });
    var removeAdmin = document.createElement("button");
    removeAdmin.appendChild(document.createTextNode("Remove Admin"));
    removeAdmin.addEventListener("click", function () {
      fetch(`/api/users/removeadmin/${userID}`, {
        method: "POST",
      });
      console.log(userID + " was revoked admin privliges");
      refreshPage();
    });

    var makeDisabled = document.createElement("button");
    makeDisabled.appendChild(document.createTextNode("Disable User"));
    makeDisabled.addEventListener("click", function () {
      fetch(`/api/users/setdisabled/${userID}`, {
        method: "POST",
      });
      console.log(userID + " was disabled");
      refreshPage();
    });

    var removeDisabled = document.createElement("button");
    removeDisabled.appendChild(document.createTextNode("Enable User"));
    removeDisabled.addEventListener("click", function () {
      fetch(`/api/users/removedisabled/${userID}`, {
        method: "POST",
      });
      console.log(userID + " was enabled");
      refreshPage();
    });

    newContent.appendChild(email);
    newContent.appendChild(isAdmin);
    newContent.appendChild(disabled);
    newContent.appendChild(giveAdmin);
    newContent.appendChild(removeAdmin);
    newContent.appendChild(makeDisabled);
    newContent.appendChild(removeDisabled);

    userDiv.appendChild(newContent);
  }

  return (
    <div className="dash-container">
      <AdminPublicPlaylistsList></AdminPublicPlaylistsList>
      <div>
        <AdminProfile></AdminProfile>
      </div>
      <div id="users-context"></div>
      <button onClick={mapData}>CLICK</button>
    </div>
  );
}
