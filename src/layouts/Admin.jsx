import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Cookies from "js-cookie";

// core components
import AdminNavbar from "../components/AdminNavbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
// import { roles } from "../constants";
import routes from "../routes.js";

import logo from "../assets/img/liki_logo.png";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "primary",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  filterRoutesByRole = (route) => route.roles ? route.roles.indexOf(Cookies.get('role')) > -1 : true
  getRoutes = routes => {
    return routes.filter(this.filterRoutesByRole).map((prop, key) => {
      if (prop.layout === "/app") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes.filter(this.filterRoutesByRole).filter(route => !route.unlisted)}
            bgColor={this.state.backgroundColor}
            logo={{
              innerLink: "/app/dashboard",
              text: Cookies.get("name"),
              subText: "",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />
            <Switch>
              {
                this.getRoutes(routes)
              }
              <Redirect from="/app" to="/app/dashboard" />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

export default Admin;
