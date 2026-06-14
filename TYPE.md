"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import queries from "@/src/graphql/queries/cms/queries";

export default function Test() {
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [selectedTestimonial, setSelectedTestimonial] = useState<{
name: string;
quote: string;
src: string | null;
designation: string;
} | null>(null);
const readFile = "https://apudairyn.next.erxes.io/gateway/read-file?key=";

// Fetch categories for filtering
const { data: catData } = useQuery(queries.cmsCategories, {
variables: {
clientPortalId: process.env.NEXT_PUBLIC_CP_ID || "pWfPHBf666Y6rD8f_V50S", // Fallback if env is missing
language: "mn",
},
});

const categories = catData?.cpCategories?.list || [];

const useCmsPosts = (variables?: any) => {
const { data, loading, error } = useQuery(queries.cmsPosts, {
variables: {
perPage: 35,
sortField: "created-desc",
...variables,
type: "test",
categoryIds: selectedCategory ? [selectedCategory] : undefined,
},
fetchPolicy: "cache-and-network",
});

    const cmsPostsList: any[] = data?.cpPostListWithPagination?.posts || [];

    return { cmsPosts: cmsPostsList, loading, error };

};

const { cmsPosts, loading } = useCmsPosts();

// Helper to strip HTML tags for the testimonial carousel
const stripHtml = (html: string) => {
return html.replace(/<[^>]\*>?/gm, "").trim();
};

const testimonials = cmsPosts.map((post) => ({
name: post.title,
quote: stripHtml(post.content || ""),
src: post.thumbnail?.url ? readFile + post.thumbnail.url : null,
designation: post.categories?.[0]?.name || "Эрүүл Сүү",
}));

return (
<div className="bg-gray-900 min-h-screen">
{/_ Flashy Filter Bar _/}
<div className="pt-20 px-6 md:px-10 flex flex-wrap gap-4 justify-center z-20 relative">
<button
onClick={() => setSelectedCategory(null)}
className={`px-8 py-3 rounded-full font-bold transition-all duration-300 border backdrop-blur-md ${
            selectedCategory === null
              ? "bg-white text-gray-900 border-white shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-110"
              : "bg-white/5 text-white border-white/20 hover:border-white/40 hover:bg-white/10"
          }`} >
Бүгд
</button>

        {/* Explicit Filter Buttons */}
        {[
          { name: "Өглөөний цай", id: "fnYP0tiCvM0MLP_d8DfwE" },
          { name: "Амттан", id: "R2tE8jt9UrLFvFycputnP" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedCategory(item.id)}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 border backdrop-blur-md ${
              selectedCategory === item.id
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-[0_0_30px_rgba(168,85,247,0.4)] scale-110"
                : "bg-white/5 text-white border-white/20 hover:border-white/40 hover:bg-white/10"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedTestimonial(testimonial)}
                className="relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] w-full border border-white/10 group transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)]"
              >
                {/* Background image or fallback gradient */}
                {testimonial.src ? (
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-gray-900 to-indigo-900/60 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                    <span className="text-white/20 font-bold text-6xl select-none">
                      {testimonial.name ? testimonial.name.substring(0, 2).toUpperCase() : "APU"}
                    </span>
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content (Title) */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-1/2">
                  <span className="text-purple-300 text-xs font-semibold tracking-wider uppercase mb-1">
                    {testimonial.designation}
                  </span>
                  <h3 className="text-white font-bold text-lg md:text-xl line-clamp-2 leading-tight group-hover:text-purple-200 transition-colors duration-300">
                    {testimonial.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white py-20 text-xl opacity-50">
            No posts found in this category.
          </div>
        )}
      </div>

      {/* Decorative background elements */}
      <div className="fixed -bottom-20 -left-20 w-96 h-96 bg-purple-600/20 blur-[128px] rounded-full pointer-events-none" />
      <div className="fixed -top-20 -right-20 w-96 h-96 bg-blue-600/20 blur-[128px] rounded-full pointer-events-none" />

      {/* Testimonial Detail Modal */}
      {selectedTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-modal-fade-in">
          {/* Backdrop click handler */}
          <div className="absolute inset-0 cursor-default" onClick={() => setSelectedTestimonial(null)} />

          <div className="relative bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full shadow-[0_0_50px_rgba(168,85,247,0.25)] flex flex-col animate-modal-scale-up max-h-[90vh]">
            {/* Close button */}
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white backdrop-blur-sm transition-all duration-200 border border-white/10 hover:border-white/20"
              aria-label="Close details"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image Area */}
            {selectedTestimonial.src ? (
              <div className="relative w-full h-64 md:h-80 overflow-hidden bg-black/20 flex-shrink-0">
                <img
                  src={selectedTestimonial.src}
                  alt={selectedTestimonial.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
              </div>
            ) : (
              <div className="w-full h-32 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
            )}

            {/* Modal content */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
              <span className="text-purple-400 text-xs md:text-sm font-semibold tracking-widest uppercase block mb-2">
                {selectedTestimonial.designation}
              </span>
              <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight mb-4 leading-tight">
                {selectedTestimonial.name}
              </h2>
              <div className="border-t border-white/10 my-4" />
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
                  {selectedTestimonial.quote}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-black/20 border-t border-white/5 flex justify-end flex-shrink-0">
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="px-6 py-2.5 rounded-full font-bold text-sm bg-white text-gray-900 hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              >
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for modal animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-modal-fade-in {
          animation: modalFadeIn 0.2s ease-out forwards;
        }
        .animate-modal-scale-up {
          animation: modalScaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}} />
    </div>

);
}
