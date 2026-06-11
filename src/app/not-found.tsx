import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Animated Icon / Illustration Container */}
        <div className="relative mb-8 transform transition-all duration-500 hover:scale-105">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-xl"></div>
          <div className="relative flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 p-6 rounded-2xl shadow-xl">
            <Image
              src="/icons/404.png"
              alt="404 - Not Found"
              width={200}
              height={200}
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Error Code & Message */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-red-150 text-red-800 dark:bg-red-950/50 dark:text-red-300 mb-4 border border-red-200 dark:border-red-900/50">
          Алдаа 404
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl mb-3">
          Уучлаарай, хуудас олдсонгүй
        </h1>
        <p className="text-base text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm">
          Таны хайсан хуудас устгагдсан, нэр нь өөрчлөгдсөн эсвэл түр хугацаанд ашиглах боломжгүй байна.
        </p>

        {/* Navigation Action */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:scale-95"
          >
            Нүүр хуудас руу буцах
          </Link>
        </div>
      </div>
    </div>
  );
}
