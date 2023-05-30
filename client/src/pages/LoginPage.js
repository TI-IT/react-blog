import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import constants from "../constants/constants";

export default function LoginPage() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)

    async function login(ev){
        ev.preventDefault();
        const response = await fetch(`${constants.API_URL_SERVER}/login`, {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        console.log(response)
        if (response.ok){
            response.json().then(userInfo => {
                alert('Пользователь залогинен')
                setUserInfo(userInfo)
                setRedirect(true)
            })
        } else {
            alert('Ошибка входа')
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type='text'
                   placeholder='username'
                   value={userName}
                   onChange={ev => setUserName(ev.target.value)}/>
            <input type='password'
                   placeholder='password'
                   value={password}
                   onChange={ev => setPassword(ev.target.value)}/>
            <button>Login</button>
        </form>
    )
}