'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavigationStore } from '@/features/navigation';
import { CloseIcon, MenuIcon } from '@/shared/ui/Icons';
import styles from './Navigation.module.css';

export const Navigation = () => {
  const pathname = usePathname();
  const { isMenuOpen, toggleMenu, closeMenu } = useNavigationStore();

  return (
    <>
      <nav className={styles.navigation} role="navigation" aria-label="Main navigation">
        <div className={styles.container}>
          <div className={styles.links} role="menubar">
            <Link
              href="/about"
              className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`}
              role="menuitem"
              aria-current={pathname === '/about' ? 'page' : undefined}
            >
              About
            </Link>
            <Link
              href="/blog"
              className={`${styles.link} ${pathname.startsWith('/blog') ? styles.active : ''}`}
              role="menuitem"
              aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
            >
              Blog
            </Link>
          </div>
          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <CloseIcon aria-hidden="true" />
            ) : (
              <MenuIcon aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className={`${styles.mobileMenu} ${styles.open}`}
          role="menu"
        >
          <Link
            href="/about"
            className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`}
            onClick={closeMenu}
            role="menuitem"
            aria-current={pathname === '/about' ? 'page' : undefined}
          >
            About
          </Link>
          <Link
            href="/blog"
            className={`${styles.link} ${pathname.startsWith('/blog') ? styles.active : ''}`}
            onClick={closeMenu}
            role="menuitem"
            aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
          >
            Blog
          </Link>
        </div>
      )}
    </>
  );
};

