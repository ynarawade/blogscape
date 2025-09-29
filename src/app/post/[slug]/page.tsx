import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


// Fetch single post
async function fetchPost(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!data) return notFound();
  return data;
}

async function PostsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
 
  const post = await fetchPost(slug);

  return (
    <div className="mx-auto max-w-3xl py-8 px-4 space-y-6">
      {/* Back button */}
      <Link className={buttonVariants({ variant: "secondary" })} href="/">
        Back to posts
      </Link>

      {/* Post image */}
      {post.imageUrl && (
        <div className="relative w-full h-72 rounded-lg overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Title + Date */}
      <div>
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-muted-foreground">
          Published on {new Date(post.createdAt).toLocaleDateString()}{" "}
        </p>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post.authorImg} alt={post.authorName} />
          <AvatarFallback>
            {post.authorName?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-primary font-semibold">{post.authorName}</p>
      </div>

      {/* Content */}
      <div className="prose max-w-none text-muted-foreground">
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default PostsPage;
