"use client";

import { useQuery } from "@apollo/client/react";
import {
  cmsPostList,
  ICmsPostListResponse,
} from "../../../../data/queries/post";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  const { data, loading, error } = useQuery<ICmsPostListResponse>(cmsPostList);
  const readFile = "https://khm.next.erxes.io/gateway/read-file?key=";

  if (loading)
    return (
      <div className="min-h-screen pt-24 px-10 xl:px-20 flex justify-center items-center">
        <p className="text-xl animate-pulse">Уншиж байна...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen pt-24 px-10 xl:px-20 flex justify-center items-center text-red-500 text-center">
        <div>
          <p className="text-xl font-bold mb-2">Алдаа гарлаа</p>
          <p>{error.message}</p>
        </div>
      </div>
    );

  const posts = data?.cpPostList?.posts || [];

  return (
    <div className="min-h-screen pt-24 px-10 xl:px-20 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 border-l-4 border-blue-600 pl-4">
          Мэдээ мэдээлэл
        </h1>

        {posts.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 p-10 rounded-xl shadow-sm text-center border border-dashed border-neutral-300 dark:border-neutral-700">
            <p className="text-neutral-500 italic">
              Мэдээ одоогоор байхгүй байна.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/news/${post._id}`}
                className="group bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-neutral-200 dark:border-neutral-800"
              >
                <div className="relative h-48 w-full bg-neutral-200 dark:bg-neutral-800">
                  {post.thumbnail?.url ? (
                    <Image
                      src={
                        post.thumbnail.url.startsWith("http")
                          ? post.thumbnail.url
                          : `${readFile}${post.thumbnail.url}`
                      }
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">
                      Зураггүй
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <div
                    className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
