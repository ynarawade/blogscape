import BlogPostCard from "@/components/general/BlogPostCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import React from "react";


async function getData(user_id: string) {
  try {
    return await prisma.blogPost.findMany({
      where: {
        authorId: user_id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    return [];
  }
}
async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();


  const myBlogs = await getData(user?.id ?? "0");
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-600 my-10">
          Your Posts
        </h3>
        <Link className={buttonVariants()} href={"/create"}>
          Create Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {myBlogs.map((blog) => (
          <BlogPostCard data={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
