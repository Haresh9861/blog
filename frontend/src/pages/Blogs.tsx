import { Appbar } from "../component/Appbar";
import { BlogCard } from "../component/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs, error } = useBlogs();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="">
                    {blogs.map(blog => (
                        <BlogCard
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"2nd Feb 2024"} // Consider dynamically generating this date if needed
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
