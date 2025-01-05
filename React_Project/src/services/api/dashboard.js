import api from ".";

export const DashboardApis = {
    getDashboardData: async () => api.get("/dashboard"),
}