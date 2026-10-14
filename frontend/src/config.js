const configuredDashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

export const DASHBOARD_URL = configuredDashboardUrl.replace(/\/$/, "");
export const DASHBOARD_REGISTER_URL = `${DASHBOARD_URL}/?register=1`;
