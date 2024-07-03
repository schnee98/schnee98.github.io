import styles from "@/styles/page.module.css";
import Navigation from "@/components/navigation/Navigation";
import PostDescription from "@/components/post/PostDescription";
import { getPosts } from "@/utils/postUtils";
import HorizontalRule from "@/components/post/HorizontalRule";

const EMAIL = "jooeun06161@gmail.com";
const GITHUB_URL = "github.com/schnee98";

const Home = async () => {
  const posts = await getPosts();
  return (
    <>
      <Navigation type="home" posts={posts} />
      <header className={styles.header}>
        <div className={styles.background}></div>
        <h1>박주은, Schnee</h1>
        <h2 className={styles.description}>주니어 프론트엔드 개발자</h2>
        <div>
          📧 <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div>
          😺 <a href={GITHUB_URL}>{GITHUB_URL}</a>
        </div>
      </header>
      <main className={styles.main}>
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
