import BlogPostCard from "@/components/general/BlogPostCard";
import { prisma } from "@/lib/db";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

async function getData() {
  try {
    return await prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        imageUrl: true,
        authorName: true,
        authorImg: true,
        createdAt: true,
        updatedAt: true,
        authorId: true,
      },
      orderBy:{
        createdAt:"desc"
      }
    });
  } catch (error) {
    return [];
  }
}

export default function Home() {
  return (
    <>
      <h3 className="text-2xl text-gray-600 font-semibold tracking-tighter my-10">
        Latest Posts
      </h3>
      <Suspense
        fallback={
          <div className='h-screen flex items-center'>
            <Loader2 className="animate-spin h-10 w-10 mx-auto text-gray-500" />
          </div>
        }
      >
        <BlogPosts />
      </Suspense>
    </>
  );
}

async function BlogPosts() {
  const latestPosts = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
      {latestPosts.map((item) => (
        <BlogPostCard data={item} key={item.id} />
      ))}
    </div>
  );
}
