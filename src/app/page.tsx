"use client";

import { useEffect, useState } from "react";
import { Comic, fetchComics } from "@/utils/marvelApi";
import Image from "next/image";

import Loader from "@/components/Loader";
import ShareButton from "@/components/SharedButton";
import DownloadButton from "@/components/DownloadButton";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [comics, setComics] = useState<Comic[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 12; // Número de cómics por página

  useEffect(() => {
    const getComics = async () => {
      setLoading(true);
      const { comics, total } = await fetchComics(page, limit);
      setComics(comics);
      setTotal(total);
      setLoading(false);
    };
    getComics();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {loading && <Loader />}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Marvel Comics
      </h1>
      {totalPages > 1 && (
        <p className="text-center text-gray-700 mb-6">
          Total de comics: {total}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {comics.map((comic) => (
          <div
            className="group relative block bg-black rounded-md overflow-hidden shadow-md"
            key={comic.id}
          >
            <Image
              alt={comic.title}
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              layout="fill"
              objectFit="cover"
              priority
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-pink-500"></p>
              <div className="mt-32 sm:mt-48 lg:mt-64">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white">{comic.title}</p>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <ShareButton
                  imageUrl={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                />
                <DownloadButton
                  imageUrl={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  title={comic.title}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center justify-center gap-4 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-900 rtl:rotate-180"
            }`}
          >
            <span className="sr-only">Prev Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <p className="text-xs text-gray-900">
            {page}
            <span className="mx-0.25">/</span>
            {totalPages}
          </p>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 ${
              page === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-900 rtl:rotate-180"
            }`}
          >
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
