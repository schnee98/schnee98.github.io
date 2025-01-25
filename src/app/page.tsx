import styles from "@/styles/page.module.css";
import Navigation from "@/components/navigation/Navigation/Navigation";
import PostDescription from "@/components/post/PostDescription";
import { getPosts } from "@/utils/postUtils";
import HorizontalRule from "@/components/post/HorizontalRule";
import Background from "@/components/header/Background";

const EMAIL = "jooeun06161@gmail.com";
const GITHUB_URL = "https://github.com/schnee98";

const Home = async () => {
  const posts = await getPosts();
  return (
    <>
      <Navigation type="home" posts={posts} />
      <header className={styles.header}>
        <Background />
      </header>
      <main className={styles.main}>
        <h1>Junior Frontend Developer</h1>
        <br />
        <div>
          📧 <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div>
          😺 <a href={GITHUB_URL}>{GITHUB_URL.replace("https://", "")}</a>
        </div>
        <HorizontalRule />
        {posts.map((post, index) => (
          <div key={`blog-post-${index}`}>
            <PostDescription {...post} />
            <HorizontalRule />
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;
