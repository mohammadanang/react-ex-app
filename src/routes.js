import Dashboard from "views/Dashboard.jsx"
import City from "views/City.jsx"

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "tim-icons icon-chart-pie-36",
        component: Dashboard,
        layout: "/app",
        roles: []
    },
    {
        path: "/city",
        name: "City",
        icon: "tim-icons icon-chart-pie-36",
        component: City,
        layout: "/app",
        roles: []
    }
]

export default routes
