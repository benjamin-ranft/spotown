import React from "react";
import LoginPage from "./components/LoginPage";
import {Redirect , Route, Switch} from "react-router-dom";
import ProtectedRoute from "./routing/ProtectedRoute";
import UserContextProvider from "./contexts/UserContextProvider";
import Discoveries from "./components/Discoveries";
import DiscoveriesContextProvider from "./contexts/DiscoveriesContextProvider";
import AddDiscoveryPage from "./components/AddDiscoveryPage";
import DiscoveryDetails from "./components/DiscoveryDetails";
import UpdateDiscoveryPage from "./components/updateDiscovery/UpdateDiscoveryPage";
import AddDiscoveryPreSelect from "./components/AddDiscoveryPreSelect";

function App() {
  return (
    <UserContextProvider>
        <DiscoveriesContextProvider>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <ProtectedRoute path="/discoveries" component={Discoveries}/>
                <ProtectedRoute path="/new/select" component={AddDiscoveryPreSelect}/>
                <ProtectedRoute path="/new/confirm" component={AddDiscoveryPage}/>
                <ProtectedRoute path="/discovery/:id" component={DiscoveryDetails}/>
                <ProtectedRoute path="/edit/:id" component={UpdateDiscoveryPage}/>
                <Route path="/">
                    <Redirect to="/discoveries"/>
                </Route>
            </Switch>
        </DiscoveriesContextProvider>
    </UserContextProvider>
  );
}

export default App;
