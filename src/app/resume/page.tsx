import Navigation from "@/components/navigation/Navigation";
import { getPosts } from "@/utils/postUtils";
import styles from "@/styles/page.module.css";
import { ResumeHeader } from "@/components/resume/ResumeHeader";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

const Resume = async () => {
  const posts = await getPosts();

  return (
    <>
      <Navigation type="home" posts={posts} />
      <main className={styles.main}>
        <ResumeHeader />
        <hr />
      </main>
    </>
  );
};

export default Resume;