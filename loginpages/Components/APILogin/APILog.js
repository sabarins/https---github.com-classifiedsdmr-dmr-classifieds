import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import cookie from "js-cookie";
import Content from "../../pages/Login";
import { useRouter } from 'next/router'


export default function indexLogin({ token }) {
  let router = useRouter();
  // const { data: session } = useSession()

  // console.log({session});

  //   useEffect(() => {
  //     console.log(sessionStorage);
  //     sessionStorage.setItem("name",name);
  //     console.log(sessionStorage.getItem("name"));
  //   });

  const showlogin = () => {
    document.getElementById("hideshow").style.display = "block";
    document.getElementById("hideshow").style.display = "flex";
  };
  let [number, setNumber] = useState("");
  let [name, setName] = useState("");

  let [status, setStatus] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  })

  function send() {

    axios
      .get(`https://rss.dinamalar.com/internal/send_otp.php?mobile=${number}`, {
        method: "POST",
        data: JSON.stringify({ mobile: number }),
      })
      .then((res) => {
        console.log("added", res);
      });
    document.getElementById("phandsubbtn").style.display = "none";
    // document.getElementById("submsg").style.display = "block";
    document.getElementById("otpcontent").style.display = "block";

    document.getElementById("senttext").style.display = "block";
    document.getElementById('edit').style.display = "block";

    document.getElementById("deschide").style.display = "none";

  }

  function otpverification() {
    let otp = document.getElementById("getotp").value;
    document.getElementById('deschide').style.display = "none";
    console.log(number, otp);
    fetch(
      `https://rss.dinamalar.com/internal/otpverify.php?mobile=${number}&lg_otp=${otp}`
    )
      .then((response) => response.json())
      .then((resp) => {
        setStatus(resp.status);
        console.log(resp);
      });

    localStorage.setItem("name", name);



  }
  if (status === "0") {
    // document.getElementById("submsg").style.display = "none";

    document.getElementById('numberinp').value = "";
    document.getElementById('getotp').value = "";
  }
  if (status === "1") {
    // document.getElementById("submsg").style.display = "none";
    document.getElementById("otpcontent").style.display = "none";
    document.getElementById('hidetxtnumandeditbtn').style.display = "none";
    document.getElementById('nameinp').style.display = "block";

    // router.push('/Login');
  }


  // if(status==="1")
  // {
  //     localStorage.setItem("name",name);
  // console.log(localStorage.getItem("name"));
  //     document.getElementById("loginon").style.display = "none";
  //     document.getElementById("logout").style.display = "block";

  // }

  console.log(status);



  let [lstorage, setLstorage] = useState();


  return (
    <div>
      <div className="headerbody">
        <div className="logn">
          <button
            onClick={(e) => {
              e.preventDefault();
              showlogin();
            }}
            className="loginbtn"
            id="loginon"
          >
            Login
          </button>
          {/* <div>{status === "1" && <Content data={localStorage.getItem("name")} />}</div> */}
          {/* <button
            onClick={(e) => {
              fetch("/api/logout", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
              });
              setLstorage(localStorage.removeItem("name"));
              document.getElementById("loginon").style.display = "block";
              document.getElementById("logout").style.display = "none";

            }}
            className="loginbtn"
            id="logout"
            style={{ marginLeft: "20px", display:"none", backgroundColor: "red" }}
          >
            Logout
          </button> */}
        </div>

        <div className="rui-3edbr Fy4_1" id="hideshow">
          <div className="ZspKa">
            <span className="-_djW" data-aut-id="btnClose">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 1024 1024"
                data-aut-id="icon"
                className
                fillRule="evenodd"
                onClick={() => { document.getElementById("hideshow").style.display = "none"; }}
              >
                <path
                  className
                  d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z"
                />
              </svg>
            </span>
            <div className="_2nMat">
              <span data-aut-id="enteruser-click-back" className="_1nc4-">

              </span>
              <div className="_2326- m-5 text-center">
                <h1 style={{ marginTop: "50px", textAlign: "center" }}> Dinamalar Classifieds </h1>
              </div>

              <div style={{ marginTop: "60px" }}>
                <div className="rui-3APY9">

                  <div className="rui-1pgaV rui-Vcp5d" />
                </div>
              </div>
              <div id="phandsubbtn">
                <div className="_2PVVq" >
                  <div className="rui-3OXDo" >
                    <label htmlFor="phone" />
                    <div className="rui-2zp0U rui-2rouh">
                      <div className="rui-z4oOZ rui-3i1AN">
                        <div className="rui-3zt7h rui-iU02L rui-WrCgP">+91</div>
                        <div className="rui-3APY9">
                          <input
                            onChange={(e) => {
                              setNumber(e.target.value);
                            }}
                            name="phone"
                            type="text"
                            autoComplete="mobile"
                            placeholder="Phone Number"
                            className="rui-3vs1L rui-2LyaK undefined"
                            id="numberinp"
                          />
                          <div className="rui-1pgaV rui-Vcp5d" />
                        </div>
                      </div>
                    </div>
                    <p>
                      <button className="verifybtn" onClick={send}>
                        SUBMIT
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              {/* <p id="submsg" style={{ display: "none", color: "green" }}>
                  OTP has been sent from entered phone number!
                </p> */}
              <div id="hidetxtnumandeditbtn" style={{ display: "flex", columnGap: "20px", fontSize: "15px" }}>
                <div>
                  <p id="senttext" style={{ display: "none" }}>We sent a 4 digit code to <b>+91{number}</b></p>
                </div>
                <div>
                  <button id="edit" style={{ display: "none" }} className="editnum">Edit</button>
                </div>
              </div>
              <div id="otpcontent" className="otpbody">
                {status === "0" && (
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "red",
                      fontWeight: "bolder"
                    }}
                  >
                    Invalid OTP, Try Again!
                  </p>
                )}
                <div>
                  <input
                    type="text"
                    className="otpinp"
                    placeholder="Enter OTP"
                    id="getotp"
                  ></input>
                  {/* <button onClick={otpverification}>Submit</button> */}
                </div>
                <button style={{ marginTop: "20px" }}
                  type="submit"
                  onClick={() => {
                    otpverification();
                    // if (status === "1") {
                    //   console.log(status);
                    //   document.getElementById("submsg").style.display =
                    //     "none";
                    // }

                  }}
                  className="rui-39-wj rui-3mpqt rui-1JPTg _2sWUW "
                >
                  <span>VERIFY</span>
                </button>
              </div>
              <div className="rui-1rV1O">
                <span
                  className="rui-3FLBC rui-_74YY"
                  data-aut-id="error-phone"
                />
              </div>


              <p id="deschide" className="_3bCAe">
                <span>
                  Your contact number is never shared with external parties nor
                  do we use it to spam you in any way.
                </span>
              </p>
              {status === "1" && (
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "green",
                  }}
                >
                  <b>OTP Verified Successfully !</b>
                </p>
              )}

              <div id="nameinp" style={{display:"none"}}>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  name="phone"
                  type="text"
                  placeholder="Enter Your Name"
                  className="rui-3vs1L rui-2LyaK undefined"
                  id="nameinp"
                />
                <p id="alertname" style={{display:"none",color:"red",fontWeight:"bolder",textAlign:"center"}}>Please Enter Your Name !</p>
                <div>
                <button id="continue" className="namebtn" style={{marginTop:"200px"}} onClick={()=>{
                  if(name==="" || name.trim==="")
                  {
                    document.getElementById("alertname").style.display = "block";
                  }
                  else{
                    router.push('./Login')}
                  }}>
                 Continue
                </button>
                </div>
              </div>

              {/* {status === "0" && (
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "red",
                    }}
                  >
                    Invalid OTP, Try Again!
                  </p>
                )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export function getServerSideProps({ req, res }) {
//   return { props: { token: req.cookies.token || "" } };
// }
