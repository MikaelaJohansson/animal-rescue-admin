import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import appLogo from "../../assets/appLogo.png"
import loginPicDog from "../../assets/loginPicDog.jpg"
import styles from "./Login.module.css";


// Demo accounts available for testing the application
const demoAccounts = [

    {
        name: "Bella",
        title:"Volunteer",
        email: "bella@animalrescue.se",
        password: "1234opå"
    },
    {
        name: "Mikaela",
        title:"Administrator",
        email: "demo@animalrescue.se",
        password: "demo4581235563768"
    },
    {
        name: "Stig",
        title:"Manager",
        email: "Stig@animalrescue.se",
        password: "1234asd"
    },
    {
        name: "Karin",
        title:"Staff",
        email: "karin@animalrescue.se",
        password: "1234zxc"
    },
    {
        name: "Tommy",
        title:"Veterinarian",
        email: "tommy@animalrescue.se",
        password: "1234qwe"
    },
    
]


export default function Login({ setIsLoggedIn}) {

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDemoMenuOpen,setIsDemoMenuOpen] = useState(false)
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

    // Demo button menu
    function handleDemoMenu(){
        setIsDemoMenuOpen(!isDemoMenuOpen)
    }

    // Fills the login form with the selected demo account credentials
    function handleSelectDemoAccount(user){
        setEmail(user.email)
        setPassword(user.password)
    }


  return (
    <main className={styles.WraperLogin}>

        <div className={styles.mainContainerLogin}>

            {/* left side og login page */}
            <aside className={styles.loginLeftSideImage}>
                <img className={styles.imgLogo} src={appLogo} alt="logo" />
                <img className={styles.dogImg} src={loginPicDog} alt="Dog's best friend" />
            </aside>

            {/* right side of login page */}
            <section className={styles.loginRightSide}>

                <aside className={styles.loginDemoInfo}>

                    <h2>Demo Account</h2>
                    <button className={styles.loginDemoButton} type='button' onClick={handleDemoMenu} disabled={isLoading}>Use demo account for</button>

                    {/* Demo account menu with selectable test users */}
                    {isDemoMenuOpen && 
                    <div className={styles.loginDemoDropdown}>
                        {demoAccounts.map((user)=>{
                            return (<button className={styles.loginDemoDropdownFileds} key={user.email} type='button' onClick={() => handleSelectDemoAccount(user)} >{user.name}: {user.title}</button>)
                        })}
                    </div>}

                </aside>
                
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
