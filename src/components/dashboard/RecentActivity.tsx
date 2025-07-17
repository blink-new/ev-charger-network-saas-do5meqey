import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "charging_started",
    message: "Charging session started at Downtown Mall",
    user: "John Doe",
    time: "2 minutes ago",
    status: "active"
  },
  {
    id: 2,
    type: "maintenance_completed",
    message: "Maintenance completed on CHG-004",
    user: "Tech Team",
    time: "15 minutes ago",
    status: "completed"
  },
  {
    id: 3,
    type: "payment_received",
    message: "Payment of $45.20 received",
    user: "Sarah Wilson",
    time: "32 minutes ago",
    status: "completed"
  },
  {
    id: 4,
    type: "charger_offline",
    message: "CHG-003 went offline - investigating",
    user: "System",
    time: "1 hour ago",
    status: "alert"
  },
  {
    id: 5,
    type: "new_user",
    message: "New user registration",
    user: "Mike Johnson",
    time: "2 hours ago",
    status: "info"
  },
  {
    id: 6,
    type: "charging_completed",
    message: "Charging session completed at Airport Terminal",
    user: "Emma Davis",
    time: "3 hours ago",
    status: "completed"
  }
]

const getActivityBadge = (type: string) => {
  switch (type) {
    case "charging_started":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Charging</Badge>
    case "maintenance_completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Maintenance</Badge>
    case "payment_received":
      return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Payment</Badge>
    case "charger_offline":
      return <Badge variant="destructive">Alert</Badge>
    case "new_user":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">User</Badge>
    case "charging_completed":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Completed</Badge>
    default:
      return <Badge variant="secondary">Activity</Badge>
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  {getActivityBadge(activity.type)}
                  <span className="text-sm font-medium">{activity.user}</span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.message}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}