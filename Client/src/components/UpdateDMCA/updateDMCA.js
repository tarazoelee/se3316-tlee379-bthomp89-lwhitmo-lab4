import React, { useEffect, useState } from "react";
import '../Privacy Policy/PrivacyPolicy.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import DMCA from "../DMCA/DMCA";
//pop up for creating the playlists
function UpdateDMCA () {
    const history = useNavigate();
    const { currentUser } = useAuth()
    const [items, setItems] = useState('')
    function goBack(){
        history(-1)
    }
    function refreshPage() {
        window.location.reload(false);
      }
    async function fetchData(){
        await fetch("/api/policies/aup")
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setItems(data)
      })
      
    }
    useEffect(()=>{
        fetchData()
    },[])

    async function update(passed){
        fetch("/api/policies/updatedmca",{
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              "Content-length" : 7
            },
            body: JSON.stringify({"info": passed})
          })
          refreshPage()
    }
  return (
    <div class='policy'>
        <h1>The current DMCA policy
        </h1>
        <DMCA></DMCA>
        Enter the new policy here:
        <p></p>
       <textarea id ='newpolicy' rows="4" cols="50"></textarea>
       <p></p>
       <button onClick={()=>update(document.getElementById('newpolicy').value)}>Submit</button>
    </div>
  );
};
 
export default UpdateDMCA;