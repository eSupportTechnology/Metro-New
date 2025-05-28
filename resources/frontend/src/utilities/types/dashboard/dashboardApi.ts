import axios from 'axios';
import apiConfig from '../../apiConfig';
import { DashboardResponse, MonthlyStatsResponse } from './IDashboard';

class DashboardService {
    private dashboardApi = axios.create({
        baseURL: apiConfig.baseURL,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    private getAuthHeaders() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        return {
            Authorization: `Bearer ${token}`,
        };
    }

    public async getDashboardStats(): Promise<DashboardResponse> {
        try {
            const response = await this.dashboardApi.get(apiConfig.endpoints.dashboard.stats, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    }

    public async getMonthlyStats(): Promise<MonthlyStatsResponse> {
        try {
            const response = await this.dashboardApi.get(apiConfig.endpoints.dashboard.monthlyStats, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching monthly stats:', error);
            throw error;
        }
    }
}

export default new DashboardService();
