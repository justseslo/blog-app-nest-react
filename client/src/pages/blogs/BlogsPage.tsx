import React, { useEffect } from "react";
import BlogList from "../../features/blog/components/BlogList";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { getBlogs } from "../../features/blog/slice/blogs.slice";
import { useSelector } from "react-redux";

function BlogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  return (
    <div>
      <BlogList blogs={blogs} />
    </div>
  );
}

export default BlogsPage;
