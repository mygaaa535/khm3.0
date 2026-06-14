"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  cmsPostList,
  ICmsPostListResponse,
  IPost,
} from "../../../data/queries/post";
import Image from "next/image";
import { X } from "lucide-react";

// --- Sub-component: TeamCard ---
const TeamCard = ({
  item,
  onClick,
  readFile,
}: {
  item: IPost;
  onClick: (item: IPost) => void;
  readFile: string;
}) => {
  const thumbnailUrl = item.thumbnail?.url;

  return (
    <div
      className="group cursor-pointer animate-fade-in-up"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
        {thumbnailUrl ? (
          <Image
            src={
              thumbnailUrl.startsWith("http")
                ? thumbnailUrl
                : `${readFile}${thumbnailUrl}`
            }
            alt={item.title}
            fill
            className="object-cover object-top transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-400 font-light">
            Зураггүй
          </div>
        )}

        {/* Hover Info Overlay - Slide Up Effect */}
        <div className="absolute inset-0 bg-black/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col justify-end items-center p-4 md:p-8 text-center z-20">
          <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
            {item.title}
          </h3>
          <div
            className="text-white/90 text-xs md:text-sm font-light tracking-wide line-clamp-2"
            dangerouslySetInnerHTML={{ __html: item.excerpt || "" }}
          />
          <div className="mt-4 w-12 h-[1px] bg-white/40" />
        </div>
      </div>
    </div>
  );
};

// --- Sub-component: TeamGroup ---
const TeamGroup = ({
  title,
  members,
  groupIndex,
  readFile,
  onCardClick,
}: {
  title: string;
  members: IPost[];
  groupIndex: number;
  readFile: string;
  onCardClick: (item: IPost) => void;
}) => {
  if (members.length === 0) return null;

  return (
    <div className="mb-24">
      <div className="mb-12 flex flex-col border-b border-gray-100 pb-8 px-4">
        <span className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
          {`0${groupIndex} // ${title}`}
        </span>
        <h4 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
          {title}
        </h4>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 px-4">
        {members.map((item) => (
          <TeamCard
            key={item._id}
            item={item}
            onClick={onCardClick}
            readFile={readFile}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main Component: TeamSection ---
export const TeamSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<IPost | null>(null);

  const readFile = "https://khm.next.erxes.io/gateway/read-file?key=";

  const { data, loading, error } = useQuery<ICmsPostListResponse>(cmsPostList, {
    variables: {
      type: "about",
      sortField: "createdAt",
      sortDirection: "1", // 1 for ASC, -1 for DESC in erxes API usually, or use "ASC"/"DESC" if supported
    },
  });

  const handleCardClick = (item: IPost) => {
    setModalOpen(true);
    setModalContent(item);
  };

  if (loading)
    return (
      <div className="mt-20 px-4">
        <div className="animate-pulse flex flex-col gap-8">
          <div className="h-10 w-64 bg-gray-200 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-[3/4] bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );

  if (error) return null;

  const posts = [...(data?.cpPostList?.posts || [])].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  // Categorize members specifically to match your request
  const managementTeam = posts.filter((post) =>
    post.categories?.some((cat) => cat.name.includes("Удирдлагын баг")),
  );

  const subsidiaries = posts.filter((post) =>
    post.categories?.some((cat) => cat.name.includes("Салбар компани")),
  );

  const investedCompanies = posts.filter((post) =>
    post.categories?.some((cat) => cat.name.includes("Хөрөнгө оруулалттай")),
  );

  // If erxes doesn't have these exact names, we can fall back to general grouping
  // But this logic ensures they appear in order 01, 02, 03.

  return (
    <div className="mt-20 pb-20">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* Render the 3 sections in order */}
      <TeamGroup
        groupIndex={1}
        title="Удирдлагын баг"
        members={
          managementTeam.length > 0
            ? managementTeam
            : posts.filter(
                (p) =>
                  !subsidiaries.includes(p) && !investedCompanies.includes(p),
              )
        }
        readFile={readFile}
        onCardClick={handleCardClick}
      />

      <TeamGroup
        groupIndex={2}
        title="Салбар компани"
        members={subsidiaries}
        readFile={readFile}
        onCardClick={handleCardClick}
      />

      <TeamGroup
        groupIndex={3}
        title="Хөрөнгө оруулалттай компани"
        members={investedCompanies}
        readFile={readFile}
        onCardClick={handleCardClick}
      />

      {/* Modal Integration */}
      {modalOpen && modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative bg-white w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-up max-h-[90vh]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 z-20 p-2 bg-white/90 rounded-full hover:bg-white transition-all shadow-lg hover:rotate-90 duration-300"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>

            {/* Modal Left: Image */}
            <div className="relative w-full md:w-[40%] h-80 md:h-auto bg-neutral-100 shrink-0">
              {modalContent.thumbnail?.url ? (
                <Image
                  src={
                    modalContent.thumbnail.url.startsWith("http")
                      ? modalContent.thumbnail.url
                      : `${readFile}${modalContent.thumbnail.url}`
                  }
                  alt={modalContent.title}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-400 font-light">
                  Зураггүй
                </div>
              )}
            </div>

            {/* Modal Right: Details */}
            <div className="w-full md:w-[60%] p-8 md:p-16 overflow-y-auto">
              <div className="name mb-8">
                <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                  {modalContent.title}
                </h3>
                <div
                  className="text-gray-500 text-lg font-medium tracking-wide"
                  dangerouslySetInnerHTML={{
                    __html: modalContent.excerpt || "",
                  }}
                />
              </div>

              <div className="w-16 h-[1px] bg-gray-300 mb-10" />

              <div
                className="info prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: modalContent.content }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
