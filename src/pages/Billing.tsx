import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, DollarSign, FileText, Search, Filter, Download, Eye, RefreshCw, AlertCircle } from "lucide-react"

const transactions = [
  {
    id: "TXN-001",
    sessionId: "SES-001",
    customerEmail: "john.doe@email.com",
    chargerLocation: "Downtown Mall",
    amount: 22.60,
    energyConsumed: 45.2,
    duration: "1h 15m",
    status: "completed",
    paymentMethod: "Credit Card",
    timestamp: "2024-01-17T10:30:00Z"
  },
  {
    id: "TXN-002",
    sessionId: "SES-002",
    customerEmail: "sarah.wilson@email.com",
    chargerLocation: "Airport Terminal",
    amount: 16.05,
    energyConsumed: 32.1,
    duration: "45m",
    status: "pending",
    paymentMethod: "Mobile Payment",
    timestamp: "2024-01-17T09:15:00Z"
  },
  {
    id: "TXN-003",
    sessionId: "SES-003",
    customerEmail: "mike.johnson@email.com",
    chargerLocation: "Business District",
    amount: 14.35,
    energyConsumed: 28.7,
    duration: "38m",
    status: "completed",
    paymentMethod: "Credit Card",
    timestamp: "2024-01-17T08:00:00Z"
  },
  {
    id: "TXN-004",
    sessionId: "SES-004",
    customerEmail: "emma.davis@email.com",
    chargerLocation: "University Campus",
    amount: 26.40,
    energyConsumed: 52.8,
    duration: "1h 50m",
    status: "failed",
    paymentMethod: "Credit Card",
    timestamp: "2024-01-16T14:20:00Z"
  },
  {
    id: "TXN-005",
    sessionId: "SES-005",
    customerEmail: "alex.brown@email.com",
    chargerLocation: "Downtown Mall",
    amount: 19.25,
    energyConsumed: 38.5,
    duration: "1h 15m",
    status: "completed",
    paymentMethod: "Mobile Payment",
    timestamp: "2024-01-16T11:30:00Z"
  }
]

const monthlyStats = [
  { month: "January", revenue: 47892, transactions: 1247, avgTransaction: 38.42 },
  { month: "December", revenue: 42156, transactions: 1089, avgTransaction: 38.71 },
  { month: "November", revenue: 39874, transactions: 1034, avgTransaction: 38.57 },
  { month: "October", revenue: 45123, transactions: 1178, avgTransaction: 38.31 },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    case "failed":
      return <Badge variant="destructive">Failed</Badge>
    case "refunded":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Refunded</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function Billing() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeRange, setTimeRange] = useState("30d")

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.chargerLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.amount, 0)
  const completedTransactions = filteredTransactions.filter(t => t.status === 'completed').length
  const pendingTransactions = filteredTransactions.filter(t => t.status === 'pending').length
  const failedTransactions = filteredTransactions.filter(t => t.status === 'failed').length

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing & Payments</h2>
          <p className="text-muted-foreground">
            Monitor transactions, revenue, and payment processing across your network.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync Payments
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From {filteredTransactions.length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTransactions}</div>
            <p className="text-xs text-muted-foreground">
              {((completedTransactions / filteredTransactions.length) * 100).toFixed(1)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTransactions}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedTransactions}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Monthly Revenue Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold">{stat.month}</h4>
                <div className="mt-2 space-y-1">
                  <div className="text-2xl font-bold">${stat.revenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.transactions} transactions
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg: ${stat.avgTransaction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by customer email, location, or transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Energy</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.customerEmail}</TableCell>
                  <TableCell>{transaction.chargerLocation}</TableCell>
                  <TableCell className="font-medium">${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.energyConsumed} kWh</TableCell>
                  <TableCell>{transaction.duration}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      {transaction.status === 'failed' && (
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}