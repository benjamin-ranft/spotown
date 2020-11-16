import React, {useState} from "react";

const initialState = {
    username: '',
    password: '',
};

export default function LoginPage() {
    const [loginData, setLoginData] = useState(initialState);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                        type="text"
                    />
                </label>
                <label>
                    Password
                    <input
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        type="password"
                    />
                </label>
                <button>Login</button>
            </form>
        </>
    );

function handleChange(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
}

function handleSubmit(event) {
    event.preventDefault();
    return (
        <div>
            Success!
        </div>
    )
}
}

