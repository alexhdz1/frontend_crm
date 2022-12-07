import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddCrm from "./components/AddCrm";
import Crm from "./components/Crm";
import CrmList from "./components/CrmList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          CRM EMPLEADOS
        </a>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={CrmList} />
          <Route exact path="/add" component={AddCrm} />
          <Route path="/tutorials/:id" component={Crm} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
