import "./normalize.css";
import "./theme.css";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { BlogPage } from "./pages/BlogPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
