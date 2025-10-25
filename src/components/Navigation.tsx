import { useDevice } from "../context/DeviceContext";
import styled from "@emotion/styled";
import { IconGithubMono, IconLinkedinMono } from "./icons";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { colors } from "../tokens/color";

interface NavigationMenuProps {
  links: {
    label: string;
    href: string;
  }[];
}

function Menu({ links }: NavigationMenuProps) {
  const location = useLocation();

  return (
    <MenuWrapper>
      <LinkWrapper>
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            data-selected={location.pathname === link.href}
          >
            {link.label}
          </Link>
        ))}
      </LinkWrapper>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  width: min-content;
  display: flex;
  flex-direction: row;
  padding: 12px 24px 12px 24px;
  background-color: ${colors.natural.white};
  overflow: hidden;
  gap: 24px;
  border-radius: 24px;
  border: 1px solid ${colors.border.primary};
`;

const LinkWrapper = styled.div`
  width: min-content;
  height: min-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0px;
  gap: 16px;
  border-radius: 0px 0px 0px 0px;
`;

const Link = styled(RouterLink)`
  width: auto;
  height: auto;
  white-space: pre;
  text-align: center;
  color: ${colors.text.primary};
  line-height: 1.2;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${colors.accent.primary};
  }

  &[data-selected="true"] {
    color: ${colors.accent.primary};
  }
`;

function Logo() {
  return (
    <Header>
      <LogoWrapper>
        <ProfileLogo src="/logo.png" alt="profile logo" />
      </LogoWrapper>
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  height: min-content;
`;

const LogoWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileLogo = styled.img`
  width: 48px;
  height: 48px;
`;

function Footer() {
  const device = useDevice();

  return (
    <FooterWrapper
      style={{
        flexDirection: device === "desktop" ? "row" : "column-reverse",
        gap: device === "desktop" ? 0 : 16,
      }}
    >
      <EmptyArea />
      <FooterLogoWrapper>
        <IconLinkedinMono />
        <IconGithubMono />
      </FooterLogoWrapper>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  width: 100%;
  height: min-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0px 8px;
`;

const FooterLogoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row;
  align-items: flex-start;
  gap: 16px;
  width: min-content;
  height: min-content;
  padding: 0;
`;

const EmptyArea = styled.div`
  width: 1px;
  height: min-content;
  min-height: 21px;
  padding: 0;
`;

export const Navigation = {
  Menu,
  Logo,
  Footer,
};
