import paginateTestimonies from "@/shared/actions/Post/paginatePosts";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home page",
};

export default async function HomePage() {

  const initTestimonies = await paginateTestimonies(3, 0);

  return (
    <div>
      <PostList
        postType="QUESTION"
        initPosts={initTestimonies}
      />
    </div>
  );
}
