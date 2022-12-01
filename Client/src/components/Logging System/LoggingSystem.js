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
      <h1>DMCA Takedown Procedure</h1>
    <ol>
    <li>Copyright Owner Investigated: 
    Copyright owners should investigate on their own first so that they are able to confirm both (a) that they own or are authorized to act on the owner’s behalf of the copyright to an original work and (b) that the content on the Website is unauthorized and infringing. This includes confirming that the use is not protected as fair use. Fair use is if the content only uses a small amount of copyrighted content, uses that content in a transformative way, uses it for educational purposes, or some combination of the above.</li> 
    <li>Copyright Owner Sends DMCA Notice: 
    After conducting an investigation, a copyright owner prepares a DMCA takedown notice and sends the complaint to BLT’s copyright agent by email: lwhitmo@uwo.ca. Assuming the takedown notice is sufficiently detailed according to the requirements the process will move on to the next step. </li>
    <li>Log Complaint: 
    A manager at BLT will investigate the infringement and fill out an online form to log the complaint into BLT’s records. </li>
    <li>Make Change to Website: 
    The manager will remove the content that the complaint targets. </li>
    <li>Remove or Reinstate Content: 
    If the content is resolved or after further investigation there is no issue with the content, it will be reinstated to the website. If not, the content will remain removed from the website. </li>
    </ol>
      </div>
        <div>
        <button id = "goBack"onClick={()=>goBack()}>Go Back</button>
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
<p></p>
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

