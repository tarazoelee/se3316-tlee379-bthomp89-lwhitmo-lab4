import React, { useEffect, useState } from "react";
import './LoggingSystem.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
//pop up for creating the playlists
function LoggingSystem () {
    const history = useNavigate();
    const { currentUser } = useAuth()
    const [items, setItems] = useState([])
    const [DataisLoaded, setLoading]= useState(false)
    function goBack(){
        history(-1)
    }
    function refreshPage() {
        window.location.reload(false);
      }

    function fetchData(){
        fetch("/api/complaints")
            .then((res) => res.json())
            .then((json) => {
                    setItems(json);
                    setLoading(true);
            ;
        })
    }

    useEffect(()=>{
        fetchData()
    }, [])

    function addRows(date, name, claim){
        fetch("/api/complaints/create",{
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              "Content-length" : 7
            },
            body: JSON.stringify({"name": name, "complaint": claim, "date": date })
          })
          refreshPage()
    
    }


  return (
    <div className="App">
        <div>
      <table>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Claim</th>
          <th>Status</th>
        </tr>
        {items.map((item) => (
        //   return (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.Name}</td>
              <td>{item.Complaint}</td>
              <td><select name="cars" id="cars">
          <option value="new">New Claim</option>
          <option value="pending">Pending Actions</option>
          <option value="complete">Action Taken</option>
        </select></td>
            </tr>
          //)
        ))}
      </table>
      </div>
      <div>
      <label>Date</label>
      <input id='date'type="text" />
      <label>Name</label>
      <input id='name' type="text"  />
      <label>Claim</label>
      <input id='claim'type="text"  />
      <button onClick={()=>addRows(document.getElementById('date').value,document.getElementById('name').value,document.getElementById('claim').value)}> Insert</button>
      </div>
    </div>
  );
};
 
export default LoggingSystem;

