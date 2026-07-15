
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {




  return (
    <main>
        <aside>
            <Sidebar></Sidebar>
        </aside>

        <section>
            <Outlet/>
        </section>
    </main>
  )
}
