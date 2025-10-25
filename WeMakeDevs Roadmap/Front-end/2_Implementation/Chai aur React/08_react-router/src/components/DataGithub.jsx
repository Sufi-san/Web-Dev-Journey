import { useLoaderData } from "react-router";

export default function DataGithub() {
    const { avatar_url: profilePic, name, followers } = useLoaderData();
    // Here we are using the built-in data loader with useLoaderData that is available in Data Mode

    return (
        <div className='flex flex-col gap-2 items-center bg-gray-700 text-white text-2xl p-4 pl-8'>
            <p>(Data Mode)</p>
            Github Followers: {followers}
            <img
                src={profilePic}
                alt="Profile Picture"
                className={`${profilePic ? "w-80 h-48" : ""} text-center`} />
            <p>Name: {name}</p>
        </div>
    );
}

export const githubInfoLoader = async ({ context, params, request }) => {
    {/**Route loaders provide data to route components before they are rendered. (Like when user hovers over the section's link) */ }
    const { userName = "Sufi-san" } = params;
    return await fetch(`https://api.github.com/users/${userName}`);
}