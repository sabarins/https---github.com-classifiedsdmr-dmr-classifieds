import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'



export default function Login() {


     let router = useRouter();

     console.log(router);


    return (
        <div className='headerbody'>
            <div className='logn'>
                <button className='loginbtn' onClick={()=>router.push('/LoginPage')}>Login</button>
            </div>
        </div>
        )
}
