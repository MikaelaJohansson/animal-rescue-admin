import { LuBell, LuCalendarDays, LuCircleHelp } from "react-icons/lu";
import { LuChevronDown } from "react-icons/lu";
import { useState } from "react";
import {signOut} from "firebase/auth"
import {auth} from "../../firebase"
import appLogo from "../../assets/appLogo.png"
import styles from "./Topbar.module.css";
import mikaelaAvatar from "../../assets/avatars/mikaelaAvatar.jpg";
import bellaAvatar from "../../assets/avatars/bellaAvatar.jpg";
import karinAvatar from "../../assets/avatars/karinAvatar.jpg";
import stigAvatar from "../../assets/avatars/stigAvatar.jpg";
import tommyAvatar from "../../assets/avatars/tommyAvatar.jpg";


// Dictionary of user avatars
const avatarImages = {
  mikaela: mikaelaAvatar,
  bella: bellaAvatar,
  karin: karinAvatar,
  stig: stigAvatar,
  tommy: tommyAvatar
};

export default function Topbar({ userProfile }) {

  const [isProfileMenuOpen,setIsProfileMenuOpen] = useState(false)

  // Maps avatar names to their corresponding images
  const profileAvatar = userProfile ? avatarImages[userProfile.avatar]: appLogo;


  function handleTopBarProfileMeny() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  // Sign out the user
  async function handleSignOut(){

    try{
      await signOut(auth)

    }catch(error){
      console.error(error)
    }

  }


  return (

    <header className={styles.topbar}>

      {/* logo */}
      <div className={styles.topBarLogo}>
        <img src={appLogo} alt="logo paw" aria-label="App logo"/>
      </div>


      {/* Notifications */}
      <div>

        <button type="button" aria-label="Notifications">
          <LuBell />
        </button>

        <button type="button" aria-label="Calendar">
          <LuCalendarDays />
        </button>

        <button type="button" aria-label="Help">
          <LuCircleHelp />
        </button>

      </div>     

      {/* avatar and user info */}
      <div className={styles.topBarUserInfoCointainer}>

        <button type="button" className={styles.topBarButton} onClick={handleTopBarProfileMeny} aria-expanded={isProfileMenuOpen} aria-label="Open profile menu" >
          
          <img
            className={styles.topBarprofileAvatar}
            src={profileAvatar}
            alt={ userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : "User avatar" }
          />

          <div>
            <p className={styles.topbarUsername}>
              {userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : "Loading user..."}
            </p>
            <span className={styles.topbarUserTitle}>
              {userProfile ? userProfile.jobTitle : ""}
            </span>
          </div>

          <LuChevronDown />

        </button>

        {/* dropdown menu */}
        {isProfileMenuOpen && (
          <div className={styles.topBarProfileDropdown}>
            <button type="button">
              Profile
            </button>

            <button type="button">
              Settings
            </button>

            {/* Sign out the user */}
            <button type="button" onClick={handleSignOut}>
              Log out
            </button>
          </div>
        )}


      </div>

    </header>

  );
}
