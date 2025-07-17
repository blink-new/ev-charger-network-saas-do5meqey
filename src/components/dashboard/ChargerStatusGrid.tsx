import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Battery, Clock, AlertTriangle } from "lucide-react"

const chargers = [
  {
    id: "CHG-001",
    location: "Downtown Mall",
    status: "online",
    power: "150kW",
    usage: 85,
    lastMaintenance: "2 days ago",
    address: "123 Main St, Downtown"
  },
  {
    id: "CHG-002", 
    location: "Airport Terminal",
    status: "charging",
    power: "50kW",
    usage: 100,
    lastMaintenance: "1 week ago",
    address: "Airport Rd, Terminal 1"
  },
  {
    id: "CHG-003",
    location: "Shopping Center",
    status: "offline",
    power: "22kW",
    usage: 0,
    lastMaintenance: "3 days ago",
    address: "456 Commerce Blvd"
  },
  {
    id: "CHG-004",
    location: "Highway Rest Stop",
    status: "maintenance",
    power: "150kW",
    usage: 0,
    lastMaintenance: "Today",
    address: "Highway 101, Mile 45"
  },
  {
    id: "CHG-005",
    location: "University Campus",
    status: "online",
    power: "75kW",
    usage: 45,
    lastMaintenance: "5 days ago",
    address: "University Ave, Building C"
  },
  {
    id: "CHG-006",
    location: "Business District",
    status: "charging",
    power: "150kW",
    usage: 92,
    lastMaintenance: "1 day ago",
    address: "789 Business Park Dr"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500"
    case "charging":
      return "bg-blue-500"
    case "offline":
      return "bg-red-500"
    case "maintenance":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "online":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Online</Badge>
    case "charging":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Charging</Badge>
    case "offline":
      return <Badge variant="destructive">Offline</Badge>
    case "maintenance":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Maintenance</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

export function ChargerStatusGrid() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Battery className="h-5 w-5" />
          Charger Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chargers.map((charger) => (
            <div
              key={charger.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm">{charger.id}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {charger.location}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(charger.status)}`} />
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  {getStatusBadge(charger.status)}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Power:</span>
                  <span className="font-medium">{charger.power}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Usage:</span>
                  <span className="font-medium">{charger.usage}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last Service:
                  </span>
                  <span className="font-medium">{charger.lastMaintenance}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                {charger.status === "offline" && (
                  <Button size="sm" variant="outline">
                    <AlertTriangle className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}