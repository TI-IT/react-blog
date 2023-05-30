import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import  constants from "../constants/constants";
import {format} from "date-fns";

export default function PostPage(){
    const [postInfo, setPostInfo] = useState(null)
    const {id} = useParams()
    useEffect(()=> {
        fetch(`${constants.API_URL_SERVER}/post/${id}`)
            .then(response=>{
                response.json().then(postInfo=>{
                    setPostInfo(postInfo)
                })
            })

    }, [])

    if(!postInfo) return ''
    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{format(new Date(postInfo.createdAt), 'd MMM yyyyг. HH:mm')}</time>
            <div className="author">автор {postInfo.author.userName}</div>
            <div className="image">
                <img src={`${constants.API_URL_SERVER}/${postInfo.cover}`} alt=""/>
            </div>
            чтобы вывести HTML текст с тегами
            <div dangerouslySetInnerHTML={{__html: postInfo.content}}/>

        </div>
    )
}