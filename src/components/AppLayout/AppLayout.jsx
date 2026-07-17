
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from "../Topbar/Topbar";


export default function AppLayout({userProfile }) {




  return (
    <main>
      <aside>
        <Sidebar></Sidebar>
      </aside>

      <div>

        <Topbar userProfile={userProfile} />

        <section>
          <Outlet/>
        </section>

      </div>
    </main>
  )
}
