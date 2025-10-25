import { useParams, useSearchParams } from "react-router"

export default function User() {
    const { userId } = useParams();

    const searchParams = useSearchParams();

    console.log(searchParams);

    return (
        <div className="flex justify-center py-4 text-white text-3xl bg-gray-600">User ID: {userId}</div>
    )
}