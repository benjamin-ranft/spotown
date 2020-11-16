import React from "react";
import LoginPage from "./components/LoginPage";
import {Redirect , Route, Switch} from "react-router-dom";
import ProtectedRoute from "./routing/ProtectedRoute";
import UserContextProvider from "./contexts/UserContextProvider";
import DiscoveriesPage from "./discoveries/DiscoveriesPage";

function App() {
  return (
    <UserContextProvider>
        <Switch>
            <Route path="/login" component={LoginPage}/>
            <ProtectedRoute path="/discoveries" component={DiscoveriesPage}/>
            <Route path="/">
                <Redirect to="/discoveries"/>
            </Route>
        </Switch>
    </UserContextProvider>
  );
}

export default App;
