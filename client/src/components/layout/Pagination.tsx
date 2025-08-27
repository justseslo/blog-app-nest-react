import type { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

export default function Pagination({ route }: { route: string }) {
  const navigate = useNavigate();
  const params = useParams();
  const currentPage = Number(params.page);
  const blogsCount = useSelector((state: RootState) => state.blogs.blogsCount);
  const totalPage = Math.ceil(blogsCount / 12);
  const pages = [
    currentPage - 2 > 0 && currentPage - 2,
    currentPage - 1 > 0 && currentPage - 1,
    currentPage,
    currentPage + 1 <= totalPage && currentPage + 1,
    currentPage + 2 <= totalPage && currentPage + 2,
  ];
  const filteredPages = pages.filter((page) => page);
  return (
    <div className="flex bg-emerald-800 text-white text-xl min-w-xs px-3 py-1 rounded-lg items-center justify-between mt-10">
      <p
        className="cursor-pointer"
        onClick={() => {
          navigate(`/${route}/1`);
        }}
      >
        First
      </p>
      <div className="flex">
        {filteredPages.map((page, index) => (
          <p
            className={`p-2 hover:bg-emerald-900 rounded-xl cursor-pointer ${
              currentPage === page && "bg-emerald-900 font-bold scale-110"
            }`}
            onClick={() => {
              navigate(`/${route}/${page}`);
            }}
            key={index}
          >
            {page}
          </p>
        ))}
      </div>
      <p
        className="cursor-pointer"
        onClick={() => {
          navigate(`/${route}/${totalPage}`);
        }}
      >
        Last
      </p>
    </div>
  );
}
