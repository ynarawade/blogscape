import SubmitBlogBtn from "@/components/general/SubmitBlogBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { handleCreatePostAction } from "@/lib/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function CreateBlogPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/register");
  }
  return (
    <div>
      <Card className="max-w-lg mx-auto my-10">
        <CardHeader>
          <CardTitle>Create post</CardTitle>
          <CardDescription>
            create a blog post and let the enitre world explore it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-y-5"
            action={handleCreatePostAction}
          >
            <div className="flex flex-col gap-y-3">
              <Label>Title</Label>
              <Input placeholder="Enter title" name="title" required />
            </div>
            <div className="flex flex-col gap-y-3">
              <Label>Content</Label>
              <Textarea placeholder="Enter content" name="content" required />
            </div>
            <div className="flex flex-col gap-y-3">
              <Label>Image Url</Label>
              <Input placeholder="Enter image url" name="url" required />
            </div>
            <SubmitBlogBtn />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateBlogPage;
