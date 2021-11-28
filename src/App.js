
import { AppBar, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard';
import EquipmentDetails from './components/EquipmentDetails';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppBar >
          <Toolbar className="tool-bar">
            <span
              variant="h5"
              component="div"
            >
              Machine Stream
            </span>


          </Toolbar>

        </AppBar>
        {/* 
      <Router>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
          <Route path="/machine/details">
            <EquipmentDetails />
          </Route>
        </Switch>
      </Router>  */}
        <Router>
          <Switch>
            {/* <Route path="/" element={<Dashboard />} / */}
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/machine/details" >
            <EquipmentDetails />
              </Route>
          </Switch>
        </Router>

      </header>
    </div>
  );
}

export default App;
