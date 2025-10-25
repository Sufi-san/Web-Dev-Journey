import useGithubData from "../hooks/useGithubData";
import { useParams } from "react-router";

export default function GithubDeclarative() {
    const { userName } = useParams();
    const { avatar_url: profilePic, name, followers } = useGithubData(userName);
    // Here we are using a custom hook as the data loader instead of useLoaderData that is available in Data Mode


    return (
        <div className='flex flex-col gap-2 items-center bg-gray-700 text-white text-2xl p-4 pl-8'>
            Github Followers: {followers}
            <img
                src={profilePic}
                alt="Profile Picture"
                className={`${profilePic ? "w-80 h-48" : ""} text-center`} />
            <p>Name: {name}</p>
        </div>
    );
}

