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

const reload = () => window.location.reload();

function App() {
  return (
    <UserContextProvider>
        <DiscoveriesContextProvider>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path="/.well-known/acme-challenge/akqWF_BgpSl3lJ_g_7qkQ5NLzjRlqbBlA58qI0R7nVU" onEnter={reload}/>
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
