import Post from "../Post";
import {useEffect, useState} from "react";
import constants from "../constants/constants";

export default function IndexPage(){
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(`${constants.API_URL_SERVER}/post`)
        fetch(`${constants.API_URL_SERVER}/post`)
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Ошибка запроса к серверу!');
                }
                return response.json();
            })
            .then(posts => {
                setPosts(posts);
            })
            .catch(error => {
                console.log("indexPage.js ===> Сервер не доступен")
                // console.error(error);
                // Добавьте здесь код обработки ошибки (например, сообщение пользователю)
            });
    }, []);

    // useEffect(()=>{
    //     fetch(`${constants.API_URL_SERVER}/post`).then(response => {
    //         response.json().then(posts => {
    //             if(posts){
    //                 setPosts(posts)
    //             }
    //         })
    //     })
    // }, [])

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post}/>
            ))}
        </>
    )
}