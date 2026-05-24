import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import { motion as Motion } from "motion/react";
import { Check, Loader } from "lucide-react";

export default function DeletePopup({ setOpen, id, handleGetAllWebsite }) {
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const result = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL || ""}/api/website/delete/${id}`,
        {
          withCredentials: true,
        },
      );
      if (result.data.success == true) {
        setDeleted(true);
      }
      handleGetAllWebsite();
      setLoading(false);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setOpen(false);
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Motion.div
      animate={{ opacity: [0, 0.3, 0.5, 0.7, 1] }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
      onClick={() => setOpen(false)}
      className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 w-screen h-screen"
    >
      <Motion.div
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 500 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 text-white p-6 rounded-2xl w-[350px]"
      >
        {!deleted ? (
          <>
            <h2 className="text-xl font-semibold mb-2">Delete Website?</h2>

            <p className="text-zinc-400 mb-6">
              Are you sure you want to delete this website?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer px-3 py-1 rounded-lg bg-zinc-700 hover:bg-zinc-600 hover:scale-105"
              >
                No
              </button>

              <button
                onClick={() => handleDelete(id)}
                className="cursor-pointer px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 hover:scale-105"
              >
                Yes, Delete
              </button>
            </div>
          </>
        ) : loading ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
              <Loader className="animate-spin" />
              Deleting...
            </h2>

            <p className="text-zinc-400">
              Please wait while deleting your website.
            </p>
          </div>
        ) : (
          <div className="text-center -space-y-96">
            <h2 className="text-2xl font-semibold text-green-500 mb-2 flex items-center justify-center gap-2">
              <Check />
              Deleted Successfully
            </h2>

            <p className="text-zinc-400">Your website has been deleted.</p>
          </div>
        )}
      </Motion.div>
    </Motion.div>
  );
}
