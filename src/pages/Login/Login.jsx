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

    function handleDemoAccount(){
        setEmail("demo@rescuedog.se")
        setPassword("demo123")
    }


  return (
    <main className={styles.WraperLogin}>

        <div className={styles.mainContainerLogin}>

            {/* left side og login page */}
            <section className={styles.loginLeftSideImage}>
                <img className={styles.imgLogo} src={appLogo} alt="logo" />
                <img className={styles.dogImg} src={loginPicDog} alt="Dog's best friend" />
            </section>

            {/* right side of login page */}
            <section className={styles.loginRightSide}>

                <section className={styles.loginDemoInfo}>
                    <h3>Demo Account</h3>
                    <button className={styles.loginDemoButton} type='button' onClick={handleDemoAccount}>Use demo account</button>
                </section>
                
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <img src={appLogo} alt="logo" />
                    <input type="email" placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)}/> 
                    <input type="password" placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <button type='submit'className={styles.loginButton}>Loggin</button>
                </form>

            </section>

        </div>

    </main>
  )
}
