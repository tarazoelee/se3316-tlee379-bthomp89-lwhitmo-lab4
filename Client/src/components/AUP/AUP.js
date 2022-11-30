import React, { useEffect, useState } from "react";
import '../Privacy Policy/PrivacyPolicy.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
//pop up for creating the playlists
function AUP () {
    const history = useNavigate();
    const { currentUser } = useAuth()
    const [items, setItems] = useState('')
    function goBack(){
        history(-1)
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
  return (
    <div class='policy'>
       <div dangerouslySetInnerHTML={{__html: items.info}}></div>
        <button onClick={()=>goBack()}>Go Back</button>
    </div>
  );
};
 
export default AUP;