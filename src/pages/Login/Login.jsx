import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom'
import appLogo from "../../assets/appLogo.png"
import loginPicDog from "../../assets/loginPicDog.jpg"
import { useNavigate } from 'react-router-dom'
import styles from "./Login.module.css";

export default function Login({ setIsLoggedIn}) {

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    function handleLogin(event){

        event.preventDefault()

        setIsLoggedIn(true)
        navigate("/dashboard")

    }



  return (
    <main className={styles.WraperLogin}>

        <div className={styles.mainContainerLogin}>

            {/* left side og login page */}
            <section className={styles.loginLeftSideImage}>
                <img src={appLogo} alt="logo" width={400} />
                <img className={styles.dogImg} src={loginPicDog} alt="Dog's best friend" />
            </section>

            {/* right side of login page */}
            <section className={styles.loginRightSide}>
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <img src={appLogo} alt="logo" width={200} />
                    <input type="mail" placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <input type="password" placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <button type='submit'>Loggin</button>
                </form>
            </section>

        </div>

    </main>
  )
}
