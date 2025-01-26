import PostDescription from "@/components/post/PostDescription/PostDescription";
import { getPosts } from "@/utils/postUtils";
import HorizontalRule from "@/components/post/HorizontalRule/HorizontalRule";

const email = "jooeun06161@gmail.com";
const githubURL = "https://github.com/schnee98";

const Home = async () => {
  const posts = await getPosts();
  return (
    <>
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
    </>
  );
};

export default Home;
