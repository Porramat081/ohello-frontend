"use client";

import { getUserPost } from "@/apis/post";
import PostCard from "@/components/PostCard";
import { errorAxios } from "@/lib/errorHandle";
import { useLoading } from "@/providers/LoaderProvider";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [userPosts, setUserPosts] = useState([]);
  const loader = useLoading();

  const fetchUserPost = async () => {
    try {
      loader?.setLoading(true);
      const res = await getUserPost();
      if (res.success) {
        setUserPosts(res.posts);
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPost();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {userPosts.map((item, index) => (
        <PostCard key={index} item={item} isGuest={false} />
      ))}
    </div>
  );
}
