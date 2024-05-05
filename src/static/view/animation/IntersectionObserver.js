const toggleOpacity = (tags) => {
  tags.forEach((tag) => {
    if (!tag.isIntersecting) {
      tag.target.style.opacity = 0;
      return;
    }

    tag.target.style.opacity = 1;
  });
};

const observer = new IntersectionObserver(toggleOpacity);
const contents = [...document.querySelector("main").children];

contents.forEach((content) => {
  content.style["transition"] = "all 0.5s";
  observer.observe(content);
});
