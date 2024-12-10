import React from "react";
import { ShareIcon } from "@/icons";

interface ShareButtonProps {
  imageUrl: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ imageUrl }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Marvel Comics",
          text: "¡Mira esta increíble imagen de Marvel!",
          url: imageUrl, // Compartir la URL de la imagen
        });
        console.log("Imagen compartida exitosamente.");
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      alert(
        "La funcionalidad de compartir no está soportada en este navegador."
      );
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label="Compartir imagen"
    >
      <ShareIcon className="w-4 h-4" />
    </button>
  );
};

export default ShareButton;
