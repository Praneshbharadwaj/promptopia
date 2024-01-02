import Feed from "@components/Feed"

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md: hidden" />
                <span className="orange_gradient text-center"> AI-Powered Prompts </span>
            </h1>
            <p className="desc text-center color text-gray-100">
                "Introducing Promptopia—an open-source AI prompting tool for today's creators. Discover, create, and share innovative prompts effortlessly. Join the creative revolution!"
            </p>


            <Feed />
        </section>
    )
}

export default Home