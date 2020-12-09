import React, {useContext, useState} from "react";
import UserContext from "../../contexts/UserContext";
import { useHistory } from 'react-router-dom';
import styled from "styled-components/";
import InputField from "../uiElements/InputField";

const initialState = {
    username: "",
    password: "",
};

export default function LoginPage() {
    const { loginWithUserCredentials } = useContext(UserContext);
    const [loginData, setLoginData] = useState(initialState);
    const [error, setError] = useState("");
    const history = useHistory();

    return (
        <Layout>
            <SplashLogo>
                <img src="./images/spotown_logo_splash.jpg" alt="Spotown logo splash"/>
            </SplashLogo>
            <Form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>
                    <InputField
                        name="username"
                        placeholder="Username"
                        value={loginData.username}
                        onChange={handleChange}
                        type="text"
                    />
                </label>
                <label>
                    <InputField
                        name="password"
                        placeholder="password"
                        value={loginData.password}
                        onChange={handleChange}
                        type="password"
                    />
                </label>
                {error && <p>{error}</p>}
                <button>Login</button>
            </Form>
        </Layout>
    );

function handleChange(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
}

function handleSubmit(event) {
    event.preventDefault();
    loginWithUserCredentials(loginData)
        .then(() => history.push("/"))
        .catch(() => setError("Unknown username or password."));
}

}

const Layout = styled.main`
display: grid;
grid-template-columns: 23px auto 23px;
grid-template-rows: 23px min-content 23px 1fr 23px;
height: 100vh;

`
const Form = styled.form`
  grid-column: 2;
  grid-row: 4;
  display: grid;
  grid-auto-rows: min-content;
  row-gap: 16px;
  
  button{
  display: block;
  color: white;
  background-color: var(--accent-red);
  border-radius: 100px;
  padding: var(--size-l);
  width: 100%;
  border: none;
  font-weight: bold;
  font-size: var(--size-l); 
  }
`

const SplashLogo = styled.section`
grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 2;
  justify-self: center;
  
  img {
  border-radius: 10px;
  max-width: 100%;
  }
`
