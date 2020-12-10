import React from "react";
import LoginPage from "./components/pages/LoginPage";
import {Redirect , Route, Switch} from "react-router-dom";
import ProtectedRoute from "./routing/ProtectedRoute";
import UserContextProvider from "./contexts/UserContextProvider";
import Discoveries from "./components/pages/Discoveries";
import DiscoveriesContextProvider from "./contexts/DiscoveriesContextProvider";
import AddDiscoveryPage from "./components/pages/AddDiscoveryPage";
import DiscoveryDetails from "./components/pages/DiscoveryDetails";
import UpdateDiscoveryPage from "./components/pages/UpdateDiscoveryPage";
import AddDiscoveryPreSelect from "./components/pages/AddDiscoveryPreSelect";

function App() {
  return (
    <UserContextProvider>
        <DiscoveriesContextProvider>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path={"/.well-known/acme-challenge/6hNbdx3SvaZpvY7ZEHJXpo8lfqJVMBRQzBhT4WF__5o"}/>
                <ProtectedRoute path="/discoveries" component={Discoveries}/>
                <ProtectedRoute path="/discoveries" component={Discoveries}/>
                <ProtectedRoute path="/new/select" component={AddDiscoveryPreSelect}/>
                <ProtectedRoute path="/new/confirm" component={AddDiscoveryPage}/>
                <ProtectedRoute path="/discovery/:id" component={DiscoveryDetails}/>
                <ProtectedRoute path="/edit/:id" component={UpdateDiscoveryPage}/>
                <Route path="/">
                    <Redirect to="/discoveries?view=list"/>
                </Route>
            </Switch>
        </DiscoveriesContextProvider>
    </UserContextProvider>
  );
}

export default App;
