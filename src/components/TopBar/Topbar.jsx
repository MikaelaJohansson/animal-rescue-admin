import styles from "../Topbar/Topbar.module.css";

export default function Topbar({ userProfile }) {





  return (

    <header className={styles.topbar}>

      <div>

        <p>{userProfile ? `${userProfile.firstName} ${userProfile.lastName}`: "Loading user..."}</p>

        <span> {userProfile ? userProfile.jobTitle : ""}</span>

      </div>

    </header>

  );

}