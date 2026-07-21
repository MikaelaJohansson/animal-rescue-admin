import DashboardStatCard from "../../components/DashboardStatCard/DashboardStatCard"
import styles from "../Dashboard/Dashborad.module.css"
import { Dog,Heart,CalendarDays,Users,FileText } from "lucide-react";

export default function Dashboard() {

  

  return (
    <section className={styles.dashboardCointainer}>

      <div className={styles.dashboardCards}>
        <DashboardStatCard
          title="Total animals"
          value={156}
          statusText="+8 this week"
          icon={Dog}
          color="green"
        />

        <DashboardStatCard
          title="Adoption requests"
          value={3}
          statusText="Waiting for review"
          icon={Heart}
          color="red"
        />

        <DashboardStatCard
          title="Upcoming appointments"
          value={12}
          statusText="Next 7 days"
          icon={CalendarDays}
          color="blue"
        />

        <DashboardStatCard
          title="Active users"
          value={18}
          statusText="Staff & Volunteers"
          icon={Users}
          color="orange"
        />

        <DashboardStatCard
          title="Reports"
          value={7}
          statusText="Open items"
          icon={FileText}
          color="yellow"
        />
      </div>      

    </section>
  )
}
