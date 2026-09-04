import { LuBell, LuChevronDown } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {collection,query,where, onSnapshot,doc,updateDoc} from "firebase/firestore";
import { auth, db } from "../../firebase";
import sideBarPawLogo from "../../assets/sideBarPawLogo.png";
import appLogo from "../../assets/appLogo.png";
import mikaelaAvatar from "../../assets/avatars/mikaelaAvatar.jpg";
import bellaAvatar from "../../assets/avatars/BellaAvatar.jpg";
import karinAvatar from "../../assets/avatars/karinAvatar.jpg";
import stigAvatar from "../../assets/avatars/stigAvatar.jpg";
import tommyAvatar from "../../assets/avatars/tommyAvatar.jpg";
import styles from "./Topbar.module.css";

const avatarImages = {
  mikaela: mikaelaAvatar,
  bella: bellaAvatar,
  karin: karinAvatar,
  stig: stigAvatar,
  tommy: tommyAvatar,
};

export default function Topbar({ userProfile }) {

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  const profileAvatar = userProfile? avatarImages[userProfile.avatar]: appLogo;


  // Listen for notifications belonging to the signed-in user
  useEffect(() => {

    const currentUser = auth.currentUser;

    if (!currentUser) {
      return;
    }

    const notificationsCollection = collection(db, "notifications" );

    const notificationsQuery = query( notificationsCollection, where("userId", "==", currentUser.uid));

    const unsubscribe = onSnapshot(

      notificationsQuery,

      (snapshot) => {

        const notificationData = snapshot.docs.map((document) => {

          return { id: document.id, ...document.data() };

        });

        setNotifications(notificationData);

      },

      (error) => {
        console.error( "Failed to load notifications:", error );
      }

    );


    return () => {
      unsubscribe();
    };

  }, []);


  // Keep only unread notifications
  const unreadNotifications = notifications.filter((notification) => {

    return notification.isRead === false;

  });

  function handleTopBarProfileMeny() {

    setIsProfileMenuOpen(!isProfileMenuOpen);

    setIsNotificationMenuOpen(false);

  }

  function handleNotificationMenu() {

    setIsNotificationMenuOpen(!isNotificationMenuOpen);

    setIsProfileMenuOpen(false);

  }

  async function handleNotificationClick(notification) {

    try {

      const notificationDocumentReference = doc( db, "notifications", notification.id);

      // Mark notification as read in Firestore
      await updateDoc( notificationDocumentReference,{ isRead: true});

      setIsNotificationMenuOpen(false);

      // Navigate to the application connected to the notification
      if(notification.type === "application_review"){

        navigate( `/adoptionDetails/${notification.applicationId}`)

      }else if(notification.type == "medical_attention"){

        navigate(`/animals/${notification.animalId}`)

      }
     

    } catch (error) {
      console.error( "Failed to open notification:", error );
    }

  }


  async function handleSignOut() {

    try {

      await signOut(auth);

    } catch (error) {

      console.error(error);

    }

  }


  return (

    <header className={styles.topbar}>


      {/* Welcome */}
      <div className={styles.topBarWelcome}>

        <img src={sideBarPawLogo} alt="Logo" />

        <div className={styles.topBarWelcomeText}>

          <h1> Welcome back,{" "} {userProfile ? userProfile.firstName : "Loading..."} </h1>

          <h3> {userProfile ? userProfile.jobTitle : ""} </h3>

        </div>

      </div>


      {/* Right side */}
      <div className={styles.topBarRight}>

        {/* Notifications */}
        <div className={styles.topBarNotification}>

          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={isNotificationMenuOpen}
            className={styles.notificationButton}
            onClick={handleNotificationMenu}
          > <LuBell />

            {unreadNotifications.length > 0 && (

              <span className={styles.notificationBadge}>

                {unreadNotifications.length}

              </span>

            )}

          </button>

          {/* Notification dropdown */}
          {isNotificationMenuOpen && (

            <div className={styles.notificationDropdown}>

              <h3> Notifications</h3>

              {unreadNotifications.length === 0 ? (

                <p> No new notifications. </p>

              ) : (

                unreadNotifications.map((notification) => {

                  return (

                    <button
                      key={notification.id}
                      type="button"
                      className={styles.notificationItem}
                      onClick={() =>
                        handleNotificationClick(notification)
                      }
                    >
                      <strong> {notification.title} </strong>

                      <span>{notification.message} </span>

                    </button>

                  );

                })

              )}

            </div>

          )}

        </div>


        {/* User profile */}
        <div className={styles.topBarUserInfoCointainer}>

          <button
            type="button"
            className={styles.topBarButton}
            onClick={handleTopBarProfileMeny}
            aria-expanded={isProfileMenuOpen}
            aria-label="Open profile menu"
          >

            <img className={styles.topBarprofileAvatar}
              src={profileAvatar}
              alt={
                userProfile
                  ? `${userProfile.firstName} ${userProfile.lastName}`
                  : "User avatar"
              }
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


          {/* Profile dropdown */}
          {isProfileMenuOpen && (

            <div className={styles.topBarProfileDropdown}>

              <button type="button">
                Profile
              </button>

              <button type="button">
                Settings
              </button>

              <button
                type="button"
                onClick={handleSignOut}
              >
                Log out
              </button>

            </div>

          )}

        </div>

      </div>

    </header>

  );

}