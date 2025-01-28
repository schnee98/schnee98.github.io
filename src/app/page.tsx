import PostDescription from "@/components/post/PostDescription/PostDescription";
import { getPosts } from "@/utils/postUtils";
import HorizontalRule from "@/components/post/HorizontalRule/HorizontalRule";
import layoutStyles from "./layout.module.css";
import Navigation from "@/components/navigation/Navigation/Navigation";
import Background from "@/components/header/Background/Background";

const email = "jooeun06161@gmail.com";
const githubURL = "https://github.com/schnee98";

const Home = async () => {
  const posts = await getPosts();
  return (
    <>
      <Navigation type="home" posts={posts} />
      <header className={layoutStyles.header}>
        <Background />
      </header>
      <main className={layoutStyles.main}>
        <h1>Junior Frontend Developer</h1>
        <br />
        <div>
          📧 <a href={`mailto:${email}`}>{email}</a>
        </div>
        <div>
          😺 <a href={githubURL}>{githubURL.replace("https://", "")}</a>
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
