import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/constants";

export const getPosts = async () => {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const filenames = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ""),
        content,
        ...data,
      } as Post;
    })
  );

  return posts.reverse();
};

export function getPost(posts: Post[], _slug: string) {
  return posts.find(({ slug }) => slug === _slug);
}
