import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./context/UserContext";
import constants from "./constants/constants";

export default function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext)
    useEffect(() => {
        fetch(`${constants.API_URL_SERVER}/profile`, {
            credentials: 'include',
        }).then(response => {
            if (!response.ok) {
                throw new Error('Ошибка запроса к серверу!');
            }
            return response.json();
        })
            .then(userInfo => {
                setUserInfo(userInfo);
            })
            .catch(error => {
                console.log("Header.js ===> Сервер не доступен")
                // console.error(error);
                // Добавьте здесь код обработки ошибки (например, сообщение пользователю)
            });
    }, []);

    function logout() {
        fetch(`${constants.API_URL_SERVER}/logout`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка запроса к серверу!');
                }
                setUserInfo(null);
            })
            .catch(error => {
                console.log("Сервер не доступен")
                // console.error(error);
                // Добавьте здесь код обработки ошибки (например, сообщение пользователю)
            });
    }

    const userName = userInfo?.userName

    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <a href={constants.API_URL_LESSON} className="logo">
                Lesson
            </a>
            <nav>
                {userName && (
                    <>
                        <Link to="/create">Create New Post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}
                {!userName && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/rsegister">Register</Link>
                    </>
                )}

            </nav>
        </header>
    );
}
