import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Battery, Search, Filter, Plus, Eye, Settings, AlertTriangle } from "lucide-react"

const chargers = [
  {
    id: "CHG-001",
    name: "Downtown Mall Station",
    location: "Downtown Mall",
    address: "123 Main St, Downtown",
    status: "online",
    powerRating: "150kW",
    currentUsage: 85,
    lastMaintenance: "2 days ago",
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: "CHG-002", 
    name: "Airport Terminal Station",
    location: "Airport Terminal",
    address: "Airport Rd, Terminal 1",
    status: "charging",
    powerRating: "50kW",
    currentUsage: 100,
    lastMaintenance: "1 week ago",
    coordinates: { lat: 40.6892, lng: -74.1745 }
  },
  {
    id: "CHG-003",
    name: "Shopping Center Station",
    location: "Shopping Center",
    address: "456 Commerce Blvd",
    status: "offline",
    powerRating: "22kW",
    currentUsage: 0,
    lastMaintenance: "3 days ago",
    coordinates: { lat: 40.7589, lng: -73.9851 }
  },
  {
    id: "CHG-004",
    name: "Highway Rest Stop Station",
    location: "Highway Rest Stop",
    address: "Highway 101, Mile 45",
    status: "maintenance",
    powerRating: "150kW",
    currentUsage: 0,
    lastMaintenance: "Today",
    coordinates: { lat: 40.7831, lng: -73.9712 }
  },
  {
    id: "CHG-005",
    name: "University Campus Station",
    location: "University Campus",
    address: "University Ave, Building C",
    status: "online",
    powerRating: "75kW",
    currentUsage: 45,
    lastMaintenance: "5 days ago",
    coordinates: { lat: 40.8176, lng: -73.9782 }
  },
  {
    id: "CHG-006",
    name: "Business District Station",
    location: "Business District",
    address: "789 Business Park Dr",
    status: "charging",
    powerRating: "150kW",
    currentUsage: 92,
    lastMaintenance: "1 day ago",
    coordinates: { lat: 40.7505, lng: -73.9934 }
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

export function ChargerNetwork() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

  const filteredChargers = chargers.filter(charger => {
    const matchesSearch = charger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         charger.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         charger.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || charger.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Charger Network</h2>
          <p className="text-muted-foreground">
            Manage and monitor your EV charging stations across all locations.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Charger
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search chargers by name, location, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="charging">Charging</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
              >
                Map
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>Showing {filteredChargers.length} of {chargers.length} chargers</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Online: {chargers.filter(c => c.status === 'online').length}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Charging: {chargers.filter(c => c.status === 'charging').length}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            Offline: {chargers.filter(c => c.status === 'offline').length}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            Maintenance: {chargers.filter(c => c.status === 'maintenance').length}
          </span>
        </div>
      </div>

      {/* Charger Grid */}
      {viewMode === "grid" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredChargers.map((charger) => (
            <Card key={charger.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{charger.name}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {charger.location}
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(charger.status)}`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xs text-muted-foreground">
                  {charger.address}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <div className="mt-1">{getStatusBadge(charger.status)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Power:</span>
                    <div className="font-medium mt-1">{charger.powerRating}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Usage:</span>
                    <div className="font-medium mt-1">{charger.currentUsage}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Service:</span>
                    <div className="font-medium mt-1">{charger.lastMaintenance}</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Settings className="h-3 w-3" />
                    Manage
                  </Button>
                  {charger.status === "offline" && (
                    <Button size="sm" variant="outline" className="gap-1">
                      <AlertTriangle className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Map View Placeholder */}
      {viewMode === "map" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Network Map View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold">Interactive Map</h3>
                <p className="text-muted-foreground">
                  Map integration coming soon. View all {chargers.length} charging stations on an interactive map.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  {filteredChargers.map((charger) => (
                    <div key={charger.id} className="flex items-center gap-2 p-2 bg-background rounded border">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(charger.status)}`} />
                      <span className="font-medium">{charger.id}</span>
                      <span className="text-muted-foreground">{charger.location}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}