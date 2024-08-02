import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../component/FullBlog";
import { Blogskeleton } from "../component/Blogskeleton";

export const Blog =()=>{
         const{id}=useParams()
        const { loading, blog, error } = useBlog({id:id || ""});
    
        if (loading) {
            return <div>
                <Blogskeleton/>
                <Blogskeleton/>
                <Blogskeleton/>
                </div>;
        }
    
        if (error) {
            return <div>Error: {error}</div>;
        }
    return <div>
        {blog && <FullBlog blog={blog} />} 
     
    </div>
}