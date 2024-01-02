"use client"
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {
                data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                ))
            }
        </div>
    )
}

const Feed = () => {
    const [searchtext, setSearchtext] = useState("");
    const [posts, setPosts] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const handleSearch = (e) => {
        clearTimeout(searchTimeout);
        setSearchtext(e.target.value);
        setSearchTimeout(() => {
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult)
            }, 500);
        })
    }
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            console.log(data)
            setPosts(data);
        }
        fetchPosts();

    }, []);
    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, 'i');
        return posts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        )
    }
    const handleTagClick = (tagname) => {
        setSearchtext(tagname);
        const searchResult = filterPrompts(tagname);
        setSearchedResults(searchResult);

    }
    return (
        <section className="feed">
            <form className="w-full relative flex-center" >
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchtext}
                    onChange={handleSearch}
                    required
                    className="search_input peer"
                />
            </form>
            {searchtext ? (
                searchedResults.length === 0 ? (
                    <div className="mt-10 text-2xl font-bold font-satoshi orange_gradient">
                        No Prompts Found
                    </div>
                ) : (
                    <PromptCardList
                        data={searchedResults}
                        handleTagClick={handleTagClick}
                    />
                )
            ) : (
                <PromptCardList data={posts} handleTagClick={handleTagClick} />
            )}
        </section>

    )
}

export default Feed