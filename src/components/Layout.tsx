import { Navigation } from "./Navigation";
import styled from "@emotion/styled";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Main>
      <Navigation.Menu
        links={[
          {
            label: "About",
            href: "/about",
          },
          {
            label: "Blog",
            href: "/blog",
          },
        ]}
      />
      <Navigation.Logo />
      {children}
      <Navigation.Footer />
    </Main>
  );
}

const Main = styled.main({
  width: "100%",
  height: "min-content",
  padding: 40,
});
