import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import cookie from "js-cookie";
import Content from "./BodyContent/Content";


export default function indexLogin({ token }) {
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

  function send() {
    axios
      .get(`https://rss.dinamalar.com/internal/send_otp.php?mobile=${number}`, {
        method: "POST",
        data: JSON.stringify({ mobile: number }),
      })
      .then((res) => {
        console.log("added", res);
      });
    document.getElementById("submsg").style.display = "block";
    document.getElementById("otpcontent").style.display = "block";
  }

  function otpverification() {
    let otp = document.getElementById("getotp").value;
    console.log(number, otp);
    fetch(
      `https://rss.dinamalar.com/internal/otpverify.php?mobile=${number}&lg_otp=${otp}`
    )
      .then((response) => response.json())
      .then((resp) => {
        setStatus(resp.status);
        console.log(resp);
      });

    
     
  }
    if(status==="1")
    {
        localStorage.setItem("name",name);
    console.log(localStorage.getItem("name"));
        document.getElementById("loginon").style.display = "none";
        document.getElementById("logout").style.display = "block";

    }

  console.log(status);

  

 let [lstorage,setLstorage] = useState();


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
          <Content />
          <button
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
          </button>
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
              >
                <path
                  className
                  d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z"
                />
              </svg>
            </span>
            <div className="_2nMat">
              <span data-aut-id="enteruser-click-back" className="_1nc4-">
                {/* <svg width="20px" height="20px" viewBox="0 0 1024 1024" data-aut-id="icon" className fillRule="evenodd">
                            <path className="rui-32D-k" d="M512 124.16v54.827l-302.293 294.187 676.949 0.043 38.827 38.784-38.827 38.784h-676.907l302.251 294.229v54.869h-56.32l-370.347-360.448v-54.869l370.347-360.405h56.32z" />
                        </svg> */}
              </span>
              <div className="_2326- m-5 text-center">
                <h1> Dinamalar Classifieds </h1>
              </div>
              {/* <h3 className="_2SLog">
              <span>Enter your phone number</span>
            </h3> */}
              <div style={{ marginTop: "60px" }}>
                <div className="rui-3APY9">
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
                  <div className="rui-1pgaV rui-Vcp5d" />
                </div>
              </div>
              <div className="_2PVVq">
                <div className="rui-3OXDo">
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
                  <p id="submsg" style={{ display: "none", color: "green" }}>
                    OTP has been sent from entered phone number!
                  </p>
                  <div id="otpcontent" className="otpbody">
                    <div>
                      <input
                        type="text"
                        className="otpinp"
                        placeholder="Enter OTP"
                        id="getotp"
                      ></input>
                      {/* <button onClick={otpverification}>Submit</button> */}
                    </div>
                    <button
                      type="submit"
                      onClick={() => {
                        otpverification();
                        if (status === "1") {
                          console.log(status);
                          document.getElementById("hideshow").style.display =
                            "none";
                        }
                        fetch("/api/login", {
                          method: "post",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ token: number }),
                        });
                      }}
                      className="rui-39-wj rui-3mpqt rui-1JPTg _2sWUW "
                    >
                      <span style={{ color: "white" }}>VERIFY</span>
                    </button>
                  </div>
                  <div className="rui-1rV1O">
                    <span
                      className="rui-3FLBC rui-_74YY"
                      data-aut-id="error-phone"
                    />
                  </div>
                </div>
              </div>

              <p className="_3bCAe">
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
                  Successfully Verified!
                </p>
              )}

              {status === "0" && (
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "red",
                  }}
                >
                  Invalid OTP, Try Again!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>{status === "1" && <Content data={localStorage.getItem("name")} />}</div>
    </div>
  );
}

// export function getServerSideProps({ req, res }) {
//   return { props: { token: req.cookies.token || "" } };
// }
