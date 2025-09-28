"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePost } from "@/lib/api";

interface DeleteButtonProps {
  postId: string;
}

const DeleteButton = ({ postId }: DeleteButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (
      !window.confirm(
        "정말로 이 리포트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);
    try {
      await deletePost(postId);

      router.push("/posts");
      router.refresh();
    } catch (e) {
      setError("리포트를 삭제하지 못했습니다. 다시 시도해주세요.");
      console.error("삭제 오류:", e);
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`
          px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition duration-200 
          ${
            isDeleting
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          }
        `}
      >
        {isDeleting ? "삭제 중..." : "삭제"}
      </button>
      {error && (
        <div className="absolute right-0 mt-2 p-2 bg-red-500 text-white text-xs rounded-lg shadow-xl whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
