
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import APILogin from '../Components/APILogin/APILog'


export default function Content(props) {

let [gname,setGname] = useState("");

let router = useRouter();

useEffect(()=>
{
  if(props.data != "")
{
  var a = localStorage.getItem("name");
  setGname(a);
  document.getElementById("successdis").innerHTML = "Successfully LogIn!.."
  setTimeout(()=>
  {
   document.getElementById("successdis").innerHTML = ""

  },3000)
}
})


  return (
    <div>
      <p id='successdis'></p>


    <div style={{ width: "100%", display:"flex", justifyContent:"space-evenly", color: "black" }}>
      <p id='dis'>Hello, {gname}</p>
      <div style={{display:"block"}}>
        <button
          onClick={(e) => {
            localStorage.removeItem("name");
            // window.location.reload();
            router.push('/')
          }}
          className="loginbtn"
          id="logout"
          style={{  backgroundColor: "red" }}>Logout</button>
      </div>
    </div>
    </div>
  )
}
