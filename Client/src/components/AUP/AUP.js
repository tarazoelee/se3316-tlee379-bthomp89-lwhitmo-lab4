import React from "react";
import '../Privacy Policy/PrivacyPolicy.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
//pop up for creating the playlists
function AUP () {
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
    <div class='policy'>
        <h1>Acceptable Use Policy</h1>
<p>
Please read this acceptable use policy carefully before using BLTify website (“website, “service) operated by BLT (“us”, “we”, “our”).
</p>
<p>
Services provided by us may only be used for lawful purposes. You agree to comply with all applicable laws, rules, and regulations in connection with your use of our services. Any material or conduct that in our judgment violates this policy in any manner may result in suspension or termination of your account with or without notice. 
</p>
<b>Prohibited use</b>
<p>
You may not use the services to publish reviews, playlists and browse music that is illegal under applicable law, that is harmful to others, or that would subject us to liability, including, without limitation, in connection with any of the following, each of which is prohibited under this AUP:
</p>
<ul>
<li>Phishing or engaging in identity theft</li>
<li>Distributing computer viruses or other malicious code</li>
<li>Promoting or facilitating violence or terrorist activities</li>
<li>Infringing the intellectual property or other proprietary rights of others</li>
</ul>
<b>Enforcement</b>
<p>
Your services may be suspended or terminated with or without notice upon any violation of this policy, Any violations may result in the immediate suspension or termination of your account.
</p>
<b>
Reporting Violations
</b>
<p>
To report a violation of this policy, please contact us by emailing lwhitmo@uwo.ca. 
</p>
<p>
We reserve the right to change this policy at any given time, of which you will be updated. If you want to make sure you are up to date with the latest changes, we advise you to frequently check this page. 
</p>
        <button onClick={()=>goBack()}>Go Back</button>
    </div>
  );
};
 
export default AUP;