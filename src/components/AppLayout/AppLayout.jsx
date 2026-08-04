
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from "../TopBar/Topbar";
import styles from "../AppLayout/AppLayout.module.css"


export default function AppLayout({userProfile }) {




  return (
    <main className={styles.mainAppLayout}>
      

      <aside className={styles.sideBarAppLayout}>
        <Sidebar></Sidebar>
      </aside>

      <section className={styles.RightSideAppLayout}>
        <div className={styles.topBarAppLayout}>
          <Topbar userProfile={userProfile} />
        </div>
        
        <div className={styles.outletAppLayout}>
          <Outlet/>
        </div>
      </section>

      
    </main>
  )
}
