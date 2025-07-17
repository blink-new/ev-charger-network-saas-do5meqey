import { StatsCards } from "@/components/dashboard/StatsCards"
import { ChargerStatusGrid } from "@/components/dashboard/ChargerStatusGrid"
import { UsageChart } from "@/components/dashboard/UsageChart"
import { RecentActivity } from "@/components/dashboard/RecentActivity"

export function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your EV charging network.
        </p>
      </div>
      
      <StatsCards />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <UsageChart />
        <RecentActivity />
      </div>
      
      <ChargerStatusGrid />
    </div>
  )
}