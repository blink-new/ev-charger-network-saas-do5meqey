import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users as UsersIcon, Search, Filter, UserPlus, Eye, Mail, Phone, MoreHorizontal, TrendingUp } from "lucide-react"

const users = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    joinDate: "2023-12-15",
    totalSessions: 45,
    totalSpent: 892.50,
    lastSession: "2024-01-17",
    membershipTier: "premium",
    avatar: ""
  },
  {
    id: "USR-002",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    joinDate: "2024-01-02",
    totalSessions: 23,
    totalSpent: 456.75,
    lastSession: "2024-01-17",
    membershipTier: "standard",
    avatar: ""
  },
  {
    id: "USR-003",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1 (555) 345-6789",
    status: "active",
    joinDate: "2023-11-20",
    totalSessions: 67,
    totalSpent: 1234.20,
    lastSession: "2024-01-16",
    membershipTier: "premium",
    avatar: ""
  },
  {
    id: "USR-004",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    joinDate: "2023-10-08",
    totalSessions: 12,
    totalSpent: 234.80,
    lastSession: "2023-12-20",
    membershipTier: "basic",
    avatar: ""
  },
  {
    id: "USR-005",
    name: "Alex Brown",
    email: "alex.brown@email.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    joinDate: "2024-01-10",
    totalSessions: 8,
    totalSpent: 156.40,
    lastSession: "2024-01-16",
    membershipTier: "standard",
    avatar: ""
  },
  {
    id: "USR-006",
    name: "Lisa Chen",
    email: "lisa.chen@email.com",
    phone: "+1 (555) 678-9012",
    status: "suspended",
    joinDate: "2023-09-15",
    totalSessions: 34,
    totalSpent: 678.90,
    lastSession: "2024-01-05",
    membershipTier: "standard",
    avatar: ""
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
    case "suspended":
      return <Badge variant="destructive">Suspended</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

const getTierBadge = (tier: string) => {
  switch (tier) {
    case "premium":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Premium</Badge>
    case "standard":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Standard</Badge>
    case "basic":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Basic</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

export function Users() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tierFilter, setTierFilter] = useState("all")

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesTier = tierFilter === "all" || user.membershipTier === tierFilter
    return matchesSearch && matchesStatus && matchesTier
  })

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0)
  const avgRevenuePerUser = totalRevenue / totalUsers

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage your EV charging network customers and their accounts.
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* User Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {activeUsers} active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((activeUsers / totalUsers) * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              User engagement rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From all users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Revenue/User</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgRevenuePerUser.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Per user lifetime value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or phone..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Membership" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Session</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{getTierBadge(user.membershipTier)}</TableCell>
                  <TableCell className="font-medium">{user.totalSessions}</TableCell>
                  <TableCell className="font-medium">${user.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(user.joinDate)}</TableCell>
                  <TableCell>{formatDate(user.lastSession)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Insights */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['premium', 'standard', 'basic'].map((tier) => {
                const count = users.filter(u => u.membershipTier === tier).length
                const percentage = (count / totalUsers) * 100
                return (
                  <div key={tier} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTierBadge(tier)}
                      <span className="text-sm">{count} users</span>
                    </div>
                    <div className="text-sm font-medium">{percentage.toFixed(1)}%</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Users by Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 5)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-muted-foreground">#{index + 1}</div>
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.totalSessions} sessions</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">${user.totalSpent.toFixed(2)}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}