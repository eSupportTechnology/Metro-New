import React from 'react';
import { RefreshCw, Users, Heart, Shield, BookOpen, TrendingUp, Clock, UserCheck, UserX, Calendar } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import 'react-toastify/dist/ReactToastify.css';
import { DashboardLoading } from '../../../components/dashboard/DashboardLoading';
import { StatCard } from '../../../components/dashboard/StatCard';
import { ChartCard } from '../../../components/dashboard/ChartCard';
import { DASHBOARD_CONSTANTS } from '../../../constants/dashboard/dashboardConstants';
import { useDashboard } from '../../../hooks/dashboard/useDashboard';
import { DashboardError } from '../../../components/dashboard/DashboardError';

const Dashboard: React.FC = () => {
    const { dashboardStats, monthlyStats, isLoading, isRefreshing, error, refreshData, getTimeSinceLastUpdate } = useDashboard();
    const { CHART_COLORS } = DASHBOARD_CONSTANTS;
    const PIE_COLORS = [CHART_COLORS.PRIMARY, CHART_COLORS.SECONDARY, CHART_COLORS.SUCCESS, CHART_COLORS.DANGER];
    if (isLoading) {
        return <DashboardLoading />;
    }

    if (error) {
        return <DashboardError error={error} onRetry={refreshData} isRetrying={isRefreshing} />;
    }

    if (!dashboardStats) {
        return null;
    }

    const genderData = [
        {
            name: 'Male',
            value: dashboardStats.matrimony_statistics.gender_distribution.male,
            color: CHART_COLORS.PRIMARY,
        },
        {
            name: 'Female',
            value: dashboardStats.matrimony_statistics.gender_distribution.female,
            color: CHART_COLORS.SECONDARY,
        },
    ];

    const packageData = dashboardStats.package_distribution.map((pkg, index) => ({
        name: `Package ${pkg.package_number}`,
        value: pkg.count,
        color: PIE_COLORS[index % PIE_COLORS.length],
    }));

    const nicVerificationData = [
        {
            name: 'Verified',
            value: dashboardStats.nic_verification_statistics.verified,
            color: CHART_COLORS.SUCCESS,
        },
        {
            name: 'Pending',
            value: dashboardStats.nic_verification_statistics.pending,
            color: CHART_COLORS.WARNING,
        },
    ];

    const mainStats = [
        {
            title: 'Total Users',
            value: dashboardStats.user_statistics.total_users,
            subtitle: `+${dashboardStats.user_statistics.new_users_this_month} this month`,
            icon: Users,
            iconColor: 'text-blue-500',
            borderColor: 'border-blue-500',
            trend: 'up' as const,
        },
        {
            title: 'Matrimony Profiles',
            value: dashboardStats.matrimony_statistics.total_profiles,
            subtitle: `+${dashboardStats.matrimony_statistics.new_profiles_this_month} this month`,
            icon: Heart,
            iconColor: 'text-pink-500',
            borderColor: 'border-pink-500',
            trend: 'up' as const,
        },
        {
            title: 'NIC Verified',
            value: dashboardStats.nic_verification_statistics.verified,
            subtitle: `${dashboardStats.nic_verification_statistics.verification_rate}% verification rate`,
            icon: Shield,
            iconColor: 'text-green-500',
            borderColor: 'border-green-500',
            trend: 'up' as const,
        },
        {
            title: 'Blog Posts',
            value: dashboardStats.blog_statistics.total_blogs,
            subtitle: `+${dashboardStats.blog_statistics.blogs_this_month} this month`,
            icon: BookOpen,
            iconColor: 'text-purple-500',
            borderColor: 'border-purple-500',
            trend: 'up' as const,
        },
    ];

    const statusStats = [
        {
            title: 'Active Profiles',
            value: dashboardStats.matrimony_statistics.active_profiles,
            icon: UserCheck,
            iconColor: 'text-green-500',
            borderColor: 'border-green-500',
            textColor: 'text-green-600',
        },
        {
            title: 'Inactive Profiles',
            value: dashboardStats.matrimony_statistics.inactive_profiles,
            icon: UserX,
            iconColor: 'text-red-500',
            borderColor: 'border-red-500',
            textColor: 'text-red-600',
        },
        {
            title: 'Pending NIC',
            value: dashboardStats.nic_verification_statistics.pending,
            icon: Clock,
            iconColor: 'text-yellow-500',
            borderColor: 'border-yellow-500',
            textColor: 'text-yellow-600',
        },
    ];

    return (
        <div className="container mx-auto p-6 font-sans  min-h-screen">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
                        <p className="text-gray-600">Last updated: {getTimeSinceLastUpdate()}</p>
                    </div>

                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                        <button
                            onClick={refreshData}
                            disabled={isRefreshing}
                            className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {mainStats.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        subtitle={stat.subtitle}
                        icon={stat.icon}
                        iconColor={stat.iconColor}
                        borderColor={stat.borderColor}
                        trend={stat.trend}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statusStats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value.toLocaleString()}</p>
                            </div>
                            <stat.icon className={stat.iconColor} size={36} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {monthlyStats && (
                    <ChartCard title={`Monthly Growth Trends (${monthlyStats.year})`} icon={TrendingUp}>
                        <ResponsiveContainer width="100%" height={DASHBOARD_CONSTANTS.CHART_HEIGHT}>
                            <LineChart data={monthlyStats.monthly_data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke={CHART_COLORS.PRIMARY}
                                    strokeWidth={3}
                                    name="New Users"
                                    dot={{ fill: CHART_COLORS.PRIMARY, strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: CHART_COLORS.PRIMARY, strokeWidth: 2 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="profiles"
                                    stroke={CHART_COLORS.SECONDARY}
                                    strokeWidth={3}
                                    name="New Profiles"
                                    dot={{ fill: CHART_COLORS.SECONDARY, strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: CHART_COLORS.SECONDARY, strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>
                )}

                <ChartCard title="Gender Distribution">
                    <ResponsiveContainer width="100%" height={DASHBOARD_CONSTANTS.CHART_HEIGHT}>
                        <PieChart>
                            <Pie
                                data={genderData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={DASHBOARD_CONSTANTS.PIE_CHART_RADIUS}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {genderData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ChartCard title="Package Distribution">
                    <ResponsiveContainer width="100%" height={DASHBOARD_CONSTANTS.CHART_HEIGHT}>
                        <BarChart data={packageData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                            <Bar dataKey="value" fill={CHART_COLORS.PRIMARY} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="NIC Verification Status">
                    <ResponsiveContainer width="100%" height={DASHBOARD_CONSTANTS.CHART_HEIGHT}>
                        <PieChart>
                            <Pie
                                data={nicVerificationData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={DASHBOARD_CONSTANTS.PIE_CHART_RADIUS}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {nicVerificationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Users className="mr-2 text-blue-600" size={20} />
                        Recent Users
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {dashboardStats.recent_activity.recent_users.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-800 truncate">
                                        {user.first_name} {user.last_name}
                                    </p>
                                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                                </div>
                                <p className="text-xs text-gray-500 flex-shrink-0 ml-2">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                        ))}
                        {dashboardStats.recent_activity.recent_users.length === 0 && <p className="text-gray-500 text-center py-4">No recent users</p>}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Heart className="mr-2 text-pink-600" size={20} />
                        Recent Profiles
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {dashboardStats.recent_activity.recent_profiles.map((profile) => (
                            <div key={profile.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-800 truncate">{profile.display_name}</p>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-600 capitalize">{profile.gender}</span>
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                profile.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {profile.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 flex-shrink-0 ml-2">{new Date(profile.created_at).toLocaleDateString()}</p>
                            </div>
                        ))}
                        {dashboardStats.recent_activity.recent_profiles.length === 0 && <p className="text-gray-500 text-center py-4">No recent profiles</p>}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Calendar className="mr-2 text-purple-600" size={20} />
                        Recent Activity
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {dashboardStats.recent_activity.recent_logs.map((log) => (
                            <div key={log.id} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                                <p className="text-sm text-gray-800 mb-1">{log.description}</p>
                                {log.matrimony && <p className="text-xs text-gray-600 mb-1">Profile: {log.matrimony.display_name}</p>}
                                <p className="text-xs text-gray-500">{new Date(log.created_at).toLocaleString()}</p>
                            </div>
                        ))}
                        {dashboardStats.recent_activity.recent_logs.length === 0 && <p className="text-gray-500 text-center py-4">No recent activity</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
