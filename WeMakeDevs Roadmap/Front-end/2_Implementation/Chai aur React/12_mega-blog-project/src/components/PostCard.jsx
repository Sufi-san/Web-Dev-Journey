import databaseService from "../appwrite/config";
import { Link } from "react-router";

function PostCard({ $id, title, featuredImg }) { // $id is the name of the property received from appwrite that holds the id
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img
                        src={databaseService.getFilePreview(featuredImg)}
                        alt={title}
                        className="rounded-xl"
                    />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard