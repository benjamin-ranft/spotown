import React from "react";
import LoginPage from "./Components/LoginPage";
import {Redirect , Route, Switch} from "react-router-dom";

function App() {
  return (
    <div>
      Welcome
        <Switch>
            <Route path="/login" component={LoginPage}/>
            <Route path="/">
                <Redirect to="/login"/>
            </Route>
        </Switch>
    </div>
  );
}

export default App;
