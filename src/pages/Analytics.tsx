import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { TrendingUp, TrendingDown, BarChart3, Calendar, Download, DollarSign, Zap, Clock, Users } from "lucide-react"
import { useState } from "react"

const usageData = [
  { name: 'Jan', usage: 2400, revenue: 1200, sessions: 145 },
  { name: 'Feb', usage: 1398, revenue: 800, sessions: 89 },
  { name: 'Mar', usage: 9800, revenue: 4200, sessions: 234 },
  { name: 'Apr', usage: 3908, revenue: 1800, sessions: 167 },
  { name: 'May', usage: 4800, revenue: 2100, sessions: 198 },
  { name: 'Jun', usage: 3800, revenue: 1600, sessions: 156 },
  { name: 'Jul', usage: 4300, revenue: 1900, sessions: 178 },
]

const dailyUsageData = [
  { time: '00:00', usage: 120 },
  { time: '04:00', usage: 80 },
  { time: '08:00', usage: 450 },
  { time: '12:00', usage: 680 },
  { time: '16:00', usage: 520 },
  { time: '20:00', usage: 380 },
  { time: '23:59', usage: 200 },
]

const chargerTypeData = [
  { name: 'Fast DC (150kW)', value: 45, color: '#10B981' },
  { name: 'Rapid DC (50kW)', value: 30, color: '#3B82F6' },
  { name: 'Standard AC (22kW)', value: 25, color: '#8B5CF6' },
]

const locationPerformance = [
  { location: 'Downtown Mall', sessions: 234, revenue: 4200, efficiency: 94 },
  { location: 'Airport Terminal', sessions: 189, revenue: 3100, efficiency: 87 },
  { location: 'Shopping Center', sessions: 156, revenue: 2800, efficiency: 91 },
  { location: 'Business District', sessions: 145, revenue: 2600, efficiency: 89 },
  { location: 'University Campus', sessions: 123, revenue: 2200, efficiency: 85 },
  { location: 'Highway Rest Stop', sessions: 98, revenue: 1800, efficiency: 82 },
]

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444']

export function Analytics() {
  const [timeRange, setTimeRange] = useState("7d")
  const [metricType, setMetricType] = useState("usage")

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive insights into your EV charging network performance.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Energy</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34,567 kWh</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,492</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.2%</span>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47 min</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-3.1%</span>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+15.3%</span>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Usage & Revenue Trends
              </CardTitle>
              <Select value={metricType} onValueChange={setMetricType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usage">Energy Usage</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="sessions">Sessions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    metricType === 'usage' ? `${value} kWh` : 
                    metricType === 'revenue' ? `$${value}` : `${value} sessions`,
                    metricType === 'usage' ? 'Energy Usage' : 
                    metricType === 'revenue' ? 'Revenue' : 'Sessions'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey={metricType} 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Daily Usage Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} kWh`, 'Usage']} />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Charger Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chargerTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chargerTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {chargerTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Location Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationPerformance.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{location.location}</h4>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                      <span>{location.sessions} sessions</span>
                      <span>${location.revenue} revenue</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{location.efficiency}%</div>
                    <div className="text-xs text-muted-foreground">efficiency</div>
                  </div>
                  <div className="ml-4">
                    <Badge 
                      variant={location.efficiency >= 90 ? "default" : location.efficiency >= 85 ? "secondary" : "destructive"}
                    >
                      {location.efficiency >= 90 ? "Excellent" : location.efficiency >= 85 ? "Good" : "Needs Attention"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}