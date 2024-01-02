"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("Fetching posts...");
                const response = await fetch(`/api/users/${session?.user.id}/posts`);
                const data = await response.json();
                console.log("Fetched data:", data);
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user.id) {
            fetchPosts();
        }
    }, [session]);

    const handleEdit = (post) => {
        console.log("Editing post:", post);
        router.push(`/update-prompt?id=${post._id}`);
    };


    const handleDelete = async (post) => {
        // Add your delete logic here
        const hasConfirmed = confirm("Are you sure you want to delete this prompt")
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })
                const filteredPosts = posts.filter((p) =>
                    p._id !== post._id)
                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;
