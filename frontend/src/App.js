import React from "react";
import LoginPage from "./Components/LoginPage";
import {Redirect , Route} from "react-router-dom";

function App() {
  return (
    <div>
      Welcome
        <switch>
            <Route path="/login" component={LoginPage}/>
            <Route path="/">
                <Redirect to="/login"/>
            </Route>
        </switch>
    </div>
  );
}

export default App;
