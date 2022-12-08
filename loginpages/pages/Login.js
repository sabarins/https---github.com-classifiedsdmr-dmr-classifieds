import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Logins() {

    let [postid, setPostid] = useState('')

    let [number, setNumber] = useState("");

    function send() {
        axios.get(`https://rss.dinamalar.com/internal/send_otp.php?mobile=${number}`,
            {
                method: 'POST',
                data: JSON.stringify({ mobile: number })
            }).then((res) => {
                console.log("added", res);
            })
    }

    function otpverification() {
        let otp = document.getElementById("getotp").value;
        console.log(number, otp);
        fetch(`https://rss.dinamalar.com/internal/otpverify.php?mobile=${number}&lg_otp=${otp}`)
            .then(response => response.json())
            .then((resp) => {
                console.log(resp);
            })

    }

    // useEffect(() => {
    //     // POST request using fetch inside useEffect React hook
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    //     };
    //     fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
    //         .then(response => response.json())
    //         .then(data => setPostid(data.title));
    // })
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {/* <p>{number}</p> */}
                <p><input type="number" onChange={(e) => { setNumber(e.target.value) }}></input></p>
                <p><button onClick={send}>Verify</button></p>
                <div className='otpbody'>
                    <div>
                        <input type="text" id='getotp'></input>
                        <button onClick={otpverification}>Submit</button>
                    </div>
                </div>
            </div>
            <div className="rui-3edbr Fy4_1" id='hideshow'>
                <div className="ZspKa"><span className="-_djW" data-aut-id="btnClose"><svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" className fillRule="evenodd"><path className d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z" /></svg></span>
                <form>
                    <div className="_2nMat"><span data-aut-id="enteruser-click-back" className="_1nc4-">
                        <svg width="20px" height="20px" viewBox="0 0 1024 1024" data-aut-id="icon" className fillRule="evenodd">
                            <path className="rui-32D-k" d="M512 124.16v54.827l-302.293 294.187 676.949 0.043 38.827 38.784-38.827 38.784h-676.907l302.251 294.229v54.869h-56.32l-370.347-360.448v-54.869l370.347-360.405h56.32z" />
                        </svg>
                        </span>
                        <div className="_2326- m-5 text-center">
                            <h1> Dinamalar Classifieds  </h1>
                        </div>
                        <h3 className="_2SLog">
                            <span>Enter your phone number</span>
                        </h3>
                        <div className="_2PVVq">
                            <div className="rui-3OXDo">
                                <label htmlFor="phone" />
                                <div className="rui-2zp0U rui-2rouh">
                                    <div className="rui-z4oOZ rui-3i1AN">
                                        <div className="rui-3zt7h rui-iU02L rui-WrCgP">+91
                                        </div>
                                        <div className="rui-3APY9">
                                            <input id="phone" name="phone" type="text" autoComplete="mobile" placeholder="Phone Number" className="rui-3vs1L rui-2LyaK undefined" defaultValue />
                                            <div className="rui-1pgaV rui-Vcp5d" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rui-1rV1O">
                                    <span className="rui-3FLBC rui-_74YY" data-aut-id="error-phone" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" data-aut-id className="rui-39-wj rui-3mpqt rui-1JPTg _2sWUW rui-38Vok" disabled><span>Next</span>
                        </button>
                        <p className="_3bCAe">
                            <span>Your contact number is never shared with external parties nor do we use it to spam you in any way.</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}
