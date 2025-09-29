import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Calendar, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogProps {
  data: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    authorImg: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

function BlogPostCard({ data }: BlogProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <article className="group relative w-full max-w-lg  overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      <Link href={`/post/${data.id}`} className="block">
        {/* Image Section */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Reading Time Badge */}
          <Badge
            variant="secondary"
            className="absolute top-4 right-4 backdrop-blur-sm bg-white/90 text-gray-700"
          >
            <Clock className="w-3 h-3 mr-1" />
            {getReadingTime(data.content)} min read
          </Badge>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {data.title}
          </h3>

          {/* Content Preview */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {data.content}
          </p>

          {/* Author & Date Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 ring-2 ring-gray-100">
                <AvatarImage src={data.authorImg} alt={data.authorName} />
                <AvatarFallback className="bg-blue-500 text-white font-medium">
                  {data.authorName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  {data.authorName}
                </p>
                <div className="flex items-center text-xs text-gray-500 space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(data.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Read More Indicator */}
            <div className="text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Read more →
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default BlogPostCard;
