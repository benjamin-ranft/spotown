import React from "react";
import LoginPage from "./components/LoginPage";
import {Redirect , Route, Switch} from "react-router-dom";
import ProtectedRoute from "./routing/ProtectedRoute";
import UserContextProvider from "./contexts/UserContextProvider";
import Discoveries from "./components/Discoveries";

function App() {
  return (
    <UserContextProvider>
        <Switch>
            <Route path="/login" component={LoginPage}/>
            <ProtectedRoute path="/discoveries" component={Discoveries}/>
            <Route path="/">
                <Redirect to="/discoveries"/>
            </Route>
        </Switch>
    </UserContextProvider>
  );
}

export default App;
