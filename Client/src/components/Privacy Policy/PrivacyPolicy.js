import React from "react";
import './PrivacyPolicy.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
//pop up for creating the playlists
function PrivacyPolicy () {
    const history = useNavigate();
    const { currentUser } = useAuth()
    function goBack(){
        if(currentUser !== null){
            history("/userdash")
        }
        else{
        history("/opendash")
        }
    }
  return (
    <div class ='policy'>
        <h1>Privacy Policy</h1>
        <p>

        Effective Date: November 23, 2022, BLT (“us”, “we”) operate under BLTify music records website. This page is to inform you of our privacy and security policies regarding information collection, usage, storage and security. 
        </p>
        <b>Information Collection and Use</b>
        <p>
        We collect various types of information from users in order to provide better services, including but not limited to: email and name for account creation. Types of data collected may include personally identifiable data so that someone from our team can contact the user. 
        </p>
        <b>Security of Data</b>
        <p>
        The security of your data is one of our foremost concerns, and we implement all necessary security features to ensure that your data is as secure as possible. However, it is important to remember that no internet, or method of electronic storage is 100% secure, so we are unable to guarantee 100% security of your data.
        </p>
        <b>Third-party providers</b>Third-party providers
        <p>
        We use multiple third-party companies and individuals that will have access to your data. However, they are required to keep your data confidential. Your data will not be sold nor used for purpose other than to ensure the best possible experience on our website. 
        </p>
        <b>Modifications to Privacy Policy</b>
        <p>
        This Privacy Policy may be amended from time to time in order to maintain compliance with the law and reflect any changes to our data collection process. When we amend this Privacy Policy we will update the “Effective Date” at the top of this Privacy Policy. We recommend that our users periodically review our Privacy Policy to ensure that they are notified of any updates. If necessary, we may notify users by email of changes to this Privacy Policy. 
        </p>
        <button onClick={()=>goBack()}>Go Back</button>
    </div>
  );
};
 
export default PrivacyPolicy;