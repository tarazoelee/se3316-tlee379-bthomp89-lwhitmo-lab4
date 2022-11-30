import React, { useEffect, useState } from "react";
import '../Privacy Policy/PrivacyPolicy.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
//pop up for creating the playlists
function DMCA () {
    const history = useNavigate();
    const { currentUser } = useAuth()
    const [items, setItems] = useState('')
    //let items;
    function goBack(){
        if(currentUser !== null){
            history(-1)
        }
        else{
        history("/opendash")
        }
    }
    async function fetchData(){
        await fetch("/api/policies/DMCA")
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
    <div class ='policy'>
        <div dangerouslySetInnerHTML={{__html: items.info}}></div>

        <button onClick={()=>goBack()}>Go Back</button>
    </div>
  );
};
 
export default DMCA;