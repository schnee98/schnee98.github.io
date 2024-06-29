import styles from "@/styles/page.module.css";
import Navigation from "@/components/navigation/Navigation";
import "@/styles/potion.css";
import Post from "@/components/post/Post";
import { getPosts } from "@/utils/postUtils";

const Home = async () => {
  const posts = await getPosts();
  return (
    <>
      <Navigation />
      <header className={styles.header}>
        <div className={styles.background}></div>
        <h1>박주은, Schnee</h1>
        <h2 className={styles.description}>주니어 프론트엔드 개발자</h2>
      </header>
      <main className={styles.main}>
        {posts.map((post) => (
          <Post {...post} />
        ))}
      </main>
    </>
  );
};

export default Home;
