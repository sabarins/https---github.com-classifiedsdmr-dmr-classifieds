import React, { useState } from 'react'
import app from './firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from 'next/router';


export default function LoginPage() {


  const router = useRouter();

  let [name, setName] = useState("");

  let [number, setNumber] = useState("");

  let [otp, setOtp] = useState("");

  const handlechange = (e) => {
    setName(e.target.value);
    setNumber(e.target.value);
    setOtp(e.target.value);

  }

  console.log(name);

  const auth = getAuth(app);


  function onCaptchaVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
        console.log("s");
        onSignInSubmit();
      },

    }, auth);
  }

  function onSignInSubmit() {

    if (number === "") 
    {
      document.getElementById('mobvalidationmsg').innerHTML = "Please Fill Mobile Number!"
      document.getElementById('mobvalidationmsg').style.display = "block";
    }
    else 
    {
      document.getElementById("displ1").style.display = "none";
      document.getElementById("displ2").style.display = "block";
      document.getElementById("alertmsgbox").style.display = "none";

      onCaptchaVerify();
      const phoneNumber = "+91" + number;
      const appVerifier = window.recaptchaVerifier;
      console.log(phoneNumber);
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // alert("otp sended");
          document.getElementById("otpmsg").style.display = "block";
          document.getElementById('otpmsg').innerHTML = "OTP is sent your entered phone number!";

          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
        });
    }


  }

  function verifiyCode() {

    window.confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      // alert("Verification Done")
      document.getElementById("otpmsg").style.display = "none";
      document.getElementById("verify").style.display = "block";
      document.getElementById("verify").innerHTML = "Verfied Done!"
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      alert("Invalid OTP");
    });

  }

  function handleCancel() {
    document.getElementById("alertmsgbox").style.display = "none";
    router.push('/LoginPage');
  }

  function handleYes()
  {
    if (number === "") 
    {
      document.getElementById('mobvalidationmsg').innerHTML = "Please Enter Mobile Number!"
      document.getElementById('mobvalidationmsg').style.display = "block";
    }
    else{
      document.getElementById("alertmsgbox").style.display = "block";
    }

  }

  return (
    <div className='loginboxbody'>
      <div className='loginbox'>
        <div className='header'>
          <p>Login</p>
        </div>

        <div className='inputfields'>
          <div id='displ1'>
            <div className='labels'>
              <input className='inp' placeholder='Enter Your Name' onChange={handlechange} type="text"></input>
            </div>
            <div className='inputs'>
              <button className='inp' style={{ borderRadius: "5px 0px 0px 5px", marginTop: "20px" }}>+91</button>
              <input className='inp' style={{ borderRadius: "0px 5px 5px 0px", marginTop: "20px" }} placeholder='Enter Your Mob. No' onChange={handlechange} type="text"></input>
            </div>
            <div>
              <p id='mobvalidationmsg' style={{color:"red",fontWeight:"bolder", display:"none"}}></p>
            </div>
            <div className='mobbtn'>
              <button className='loginbtn' onClick={handleYes}>Verify Your Phone Number</button>
            </div>
          </div>
          <div id='displ2'>
            <div className='labels'>
              <div id="recaptcha-container"></div>
              <p style={{color:"green", fontWeight:"bolder"}} id='otpmsg'></p>
              <input className='inp' placeholder='Enter otp' onChange={handlechange} type="text"></input>
            </div>
            <div>
              <button className='loginbtn' onClick={verifiyCode}>Submit</button>
            </div>
            <div>
              <p id='verify' style={{color:"green",fontWeight:"bolder",display:'none'}}></p>
            </div>
          </div>
          {/* <div>
            <button className='loginbtn' onClick={onSignInSubmit}>Submit</button>
          </div> */}
        </div>
      </div>
      <div id='alertmsgbox'>
        <div style={{ padding: "5px" }}>
          <p>Are you sure send OTP to this number +91{number}?</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <button onClick={handleCancel} style={{ padding: "15px", borderRadius: "5px", color: "white", backgroundColor: "red", border: "none", cursor: "pointer" }} >Cancel</button>
          </div>
          <div>
            <button onClick={onSignInSubmit} style={{ padding: "15px", borderRadius: "5px", color: "white", backgroundColor: "green", border: "none", cursor: "pointer" }}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  )
}
