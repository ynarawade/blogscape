"use client"
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

function SubmitBlogBtn() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-fit mx-auto" type="submit" disabled={pending}>{pending ? `Submitting` : `Submit`}</Button>
  );
}

export default SubmitBlogBtn;
