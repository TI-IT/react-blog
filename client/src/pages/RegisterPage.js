import {useState} from "react";
import constants from "../constants/constants";

export default function RegisterPage(){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    async function register(ev){
        ev.preventDefault();
        const response = await fetch(`${constants.API_URL_SERVER}/register`, {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: {'Content-Type': 'application/json'}
        })
        if (response.ok === false ){
            alert('регистрация не прошла')
        } else {
            alert('регистрация прошла успешно')
        }
    }
    return (
            <form className="register" onSubmit={register}>
                <h1>Register</h1>
                <input
                    type='text'
                    placeholder='username'
                    value={userName}
                    onChange={ev => setUserName(ev.target.value)}
                />
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                />
                <button>Register</button>
            </form>
    )
}