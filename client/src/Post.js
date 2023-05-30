import {format} from "date-fns";
import {Link} from "react-router-dom";
import constants from "./constants/constants";

export default function Post({
                                 _id,
                                 title,
                                 summary,
                                 cover,
                                 content,
                                 createdAt,
                                 author,
                                 url
                             }) {
    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img
                        src={constants.API_URL_SERVER+'/'+cover}
                        alt=""
                    />
                </Link>

            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <a className="author">{author.userName}</a>
                    <time>{format(new Date(createdAt), 'd MMM yyyyг. HH:mm')}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
}
