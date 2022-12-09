
import React, { useEffect, useState } from 'react'

export default function Content(props) {


    let [lstorage,setLstorage] = useState(props.data);
    useEffect(()=>
    {
        setLstorage(localStorage.removeItem("name"));
    })
  return (
    <div style={{width:"100%",height:"20px",color:"black"}}>
    <p>Hi, {lstorage}</p>
    </div>
  )
}
