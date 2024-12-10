import React from "react";
import fileDownload from "js-file-download";

import { DownloadIcon } from "@/icons";

interface DownloadButtonProps {
  imageUrl: string;
  title: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl, title }) => {
  const handleDownload = async (url: string, title: string) => {
    const response = await fetch(url.replace(/^http:\/\//i, "https://"));
    const blob = await response.blob();
    fileDownload(blob, `${title}.jpg`);
  };

  return (
    <button
      onClick={() => handleDownload(imageUrl, title)}
      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label="Descargar imagen"
    >
      <DownloadIcon className="w-4 h-4" />
    </button>
  );
};

export default DownloadButton;
