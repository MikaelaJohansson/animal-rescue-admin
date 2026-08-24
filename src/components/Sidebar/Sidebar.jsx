import { NavLink } from "react-router-dom"
import { FaDog, FaHouse, FaFilePen  } from "react-icons/fa6";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import styles from "../Sidebar/Sidebar.module.css"
import sideBarAppLogoWhite from "../../assets/sideBarAppLogoWhite.png"
import sideBarPawLogoWhite from "../../assets/sideBarPawLogoWhite.png"


export default function Sidebar() {

  const [isExpanded, setIsExpanded] = useState(() => {const isDesktopScreen = window.matchMedia("(min-width: 768px)").matches;

    if (isDesktopScreen) {
      return true;
    } else {
      return false;
    }
  });

  // Sets the sidebar expanded state
  function handleArrowChange(){
    setIsExpanded(!isExpanded)
  }


  return (
    <div className={`${styles.sidebarMain} ${isExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}`} >

      <div className={styles.sidebarHeader}>

        <img className={styles.sidebarLogo} src={isExpanded ? sideBarAppLogoWhite : sideBarPawLogoWhite} alt="logo"/>

        <div className={isExpanded ? styles.sideBarLineBig : styles.sideBarLineSmall}></div>

        {/*  Toggles the sidebar expanded state */}
        <button type="button" onClick={handleArrowChange} className={styles.sidebarButton} aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"} aria-expanded={isExpanded}>
          {isExpanded ? <LuChevronLeft/> : <LuChevronRight/>}
        </button>

      </div>
     
      {/* sidebar Links to other pages */}
      <nav className={styles.sideBarNav}>
        <NavLink className={({ isActive }) => `${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed} ${isActive ? styles.sidebarLinkActive : ""}`} to="/dashboard"><FaHouse />{isExpanded && <span>Dashboard</span>}</NavLink>
        <NavLink className={({ isActive }) => `${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed} ${isActive ? styles.sidebarLinkActive : ""}`} to="/animals"><FaDog/>{isExpanded && <span>Animals</span>}</NavLink>
        <NavLink className={({ isActive }) => `${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed} ${isActive ? styles.sidebarLinkActive : ""}`} to="/adoptions"><FaFilePen />{isExpanded && <span>Applications</span>}</NavLink>
        {/* <NavLink className={({ isActive }) => `${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed} ${isActive ? styles.sidebarLinkActive : ""}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</NavLink>
        <NavLink className={({ isActive }) => `${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed} ${isActive ? styles.sidebarLinkActive : ""}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</NavLink>
        <NavLink className={({ isActive }) => `${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed} ${isActive ? styles.sidebarLinkActive : ""}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</NavLink>
        <NavLink className={({ isActive }) => `${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed} ${isActive ? styles.sidebarLinkActive : ""}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</NavLink>
        <NavLink className={({ isActive }) => `${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed} ${isActive ? styles.sidebarLinkActive : ""}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</NavLink>
       */}
      </nav>

    </div>
  )
}