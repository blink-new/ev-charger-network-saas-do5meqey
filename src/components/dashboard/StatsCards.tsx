import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Battery, Zap, DollarSign, Users } from "lucide-react"

const stats = [
  {
    title: "Total Chargers",
    value: "1,247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Zap,
    description: "Active charging stations"
  },
  {
    title: "Online Status",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: Battery,
    description: "Chargers currently online"
  },
  {
    title: "Monthly Revenue",
    value: "$47,892",
    change: "+18%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "This month's earnings"
  },
  {
    title: "Active Users",
    value: "8,429",
    change: "+7%",
    changeType: "positive" as const,
    icon: Users,
    description: "Registered users"
  }
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge 
                variant={stat.changeType === "positive" ? "default" : "destructive"}
                className="text-xs"
              >
                {stat.change}
              </Badge>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}