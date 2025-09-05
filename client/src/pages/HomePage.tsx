import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import BlogCard from "@/features/blog/components/BlogCard";
import { getBestBlogs } from "@/features/blog/slice/blogs.slice";
import type { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const bestBlogs = useSelector((state: RootState) => state.blogs.bestBlogs);
  useEffect(() => {
    dispatch(getBestBlogs());
  }, []);
  return (
    <div className="flex items-center flex-col">
      <div className="relative w-full max-w-10/12 mt-5">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp7348236.jpg&f=1&nofb=1&ipt=3d3f87a4e963f11c8741881ecd46f30efd8ffbfc5849e355bcacb41a2297d687"
          alt=""
          className="rounded-xl bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-emerald-900/40 rounded-xl"></div>
        <div className="absolute top-1/2 left-1/2 text-white z-20 -translate-1/2">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-shadow-lg">
            Read , Write , Share
          </h2>
          <p className="text-xl opacity-90 mt-2">
            Discover amazing stories and share your own journey
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button
              className="bg-emerald-600 hover:translate-y-3 hover:bg-emerald-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-3 cursor-pointer"
              onClick={() => {
                navigate("/blogs/1");
              }}
            >
              Explore Blogs
            </Button>
            <Button
              className="bg-transparent border-2 hover:translate-y-3 border-white hover:bg-white hover:text-emerald-700 transition-all duration-300 px-8 py-3 cursor-pointer"
              onClick={() => {
                navigate("/blogs/create-blog");
              }}
            >
              Start Writing
            </Button>
          </div>
        </div>
      </div>

      <div className="items-center flex flex-col gap-5 mt-7 max-w-10/12 ">
        <h2 className="text-emerald-900 text-4xl text-shadow-md text-shadow-emerald-200">
          Most liked blogs
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-5 ">
          {bestBlogs.map((blog) => (
            <BlogCard
              blog={blog}
              showActions={false}
              handleClick={(id: string) => {
                navigate(`/blog-detail/${id}`);
              }}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
