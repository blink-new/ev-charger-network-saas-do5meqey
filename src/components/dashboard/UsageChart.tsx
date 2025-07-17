import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from "lucide-react"

const data = [
  {
    name: 'Mon',
    usage: 2400,
    revenue: 1200,
  },
  {
    name: 'Tue',
    usage: 1398,
    revenue: 800,
  },
  {
    name: 'Wed',
    usage: 9800,
    revenue: 4200,
  },
  {
    name: 'Thu',
    usage: 3908,
    revenue: 1800,
  },
  {
    name: 'Fri',
    usage: 4800,
    revenue: 2100,
  },
  {
    name: 'Sat',
    usage: 3800,
    revenue: 1600,
  },
  {
    name: 'Sun',
    usage: 4300,
    revenue: 1900,
  },
]

export function UsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Weekly Usage & Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === 'usage' ? `${value} kWh` : `$${value}`,
                name === 'usage' ? 'Energy Usage' : 'Revenue'
              ]}
            />
            <Bar dataKey="usage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}