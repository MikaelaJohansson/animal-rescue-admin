
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from "../Topbar/Topbar";
import styles from "../AppLayout/AppLayout.module.css"


export default function AppLayout({userProfile,userPermissions }) {




  return (
    <main className={styles.mainAppLayout}>
      

      <aside className={styles.sideBarAppLayout}>
        <Sidebar userPermissions={userPermissions} />
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
