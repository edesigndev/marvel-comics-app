import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="loader mb-4"></div>
        <style jsx>{`
          .loader {
            border: 8px solid rgba(255, 255, 255, 0.3);
            border-top: 8px solid #f0131e;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
