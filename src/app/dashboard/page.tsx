import BlogPostCard from "@/components/general/BlogPostCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

// Simulate API call with 10 seconds delay
async function dummydata() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      console.log("Timeout ends");
      resolve("Hello Dashboard after 10 secs");
    }, 10000); // 10 seconds
  });
}

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

  if (!user) {
    return redirect("/api/auth/register");
  }
  const myBlogs = await getData(user?.id ?? "0");
  return (
    <div className="p-4 md:p-6">
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
