import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProfile from "./AdminProfile";

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
    let i = 0;
    items.map((item) => {
      newMap.push(item);
      i++;
    });
    for (var j = 0; j < newMap.length; j++) {
      displayUser(newMap, userDiv, j);
    }
    console.log(newMap);
  }

  if (!DataisLoaded) {
    return (
      <div>
        {" "}
        <h1 className="text-white fs-5"> loading.... </h1>{" "}
      </div>
    );
  }

  function displayUser(newMap, userDiv, j) {
    var newContent = document.createElement("li");
    var email = document.createTextNode("Email: " + newMap[j].email);
    var isAdmin = document.createTextNode("isAdmin: " + newMap[j].isAdmin);
    var disabled = document.createTextNode("Disabled: " + newMap[j].disabled);
    //var giveAdmin //button which onclick gives the user admin
    //var removeAdmin //button which onclick gives the user admin
    //var makeDisabled //button which onclick gives the user admin
    //var unDisabled //button which onclick gives the user admin

    newContent.appendChild(email);
    newContent.appendChild(isAdmin);
    newContent.appendChild(disabled);
    userDiv.appendChild(newContent);
  }

  return (
    <div className="dash-container">
      <div>
        <AdminProfile></AdminProfile>
      </div>
      <div id="users-context"></div>
      <button onClick={mapData}>CLICK</button>
    </div>
  );
}
//use state to ensure the person trying to access his page is the admin
