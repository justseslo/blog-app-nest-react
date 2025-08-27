import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { getBlogs, getBlogsCount } from "../../features/blog/slice/blogs.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BlogCard from "@/features/blog/components/BlogCard";
import Pagination from "@/components/layout/Pagination";
import { useParams } from "react-router";

function BlogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const { page } = useParams();

  useEffect(() => {
    dispatch(getBlogs(page ? page : "1"));
    dispatch(getBlogsCount());
  }, [page]);
  const handleClick = (id: string) => {
    navigate(`/blog-detail/${id}`);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-5 px-6 mt-7">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            showActions={false}
            handleClick={handleClick}
          />
        ))}
      </div>
      <Pagination route="blogs" />
    </div>
  );
}

export default BlogsPage;
