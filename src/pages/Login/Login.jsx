import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import appLogo from "../../assets/appLogo.png"
import loginPicDog from "../../assets/loginPicDog.jpg"
import styles from "./Login.module.css";


export default function Login({ setIsLoggedIn}) {

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const navigate = useNavigate()

    // Log in the user
    async function handleLogin(event){

        event.preventDefault()

        try{

            setIsLoading(true)

            await signInWithEmailAndPassword(auth,email,password);

            setErrorMessage("")
            setEmail("")
            setPassword("")
            setIsLoggedIn(true)
            navigate("/dashboard")

        }catch(error){
            console.log(error)
            setErrorMessage("Incorrect email or password")
        }finally{
            setIsLoading(false)
        }

    }

    // Demo account credentials
    function handleDemoAccount(){
        setEmail("demo@animalrescue.se")
        setPassword("demo4581235563768")
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
                    <button className={styles.loginDemoButton} type='button' onClick={handleDemoAccount} disabled={isLoading}>Use demo account</button>
                </section>
                
                {/* Form fields */}
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <img src={appLogo} alt="logo" />
                    <input type="email" placeholder='Email' value={email} required onChange={(event) => setEmail(event.target.value)}/> 
                    <input type="password" placeholder='Password' value={password} required onChange={(event) => setPassword(event.target.value)}/>
                    {errorMessage && <p>{errorMessage}</p>}
                    <button type='submit'className={styles.loginButton}>{isLoading ? "Logging in...." : "Log in"}</button>
                </form>

            </section>

        </div>

    </main>
  )
}
