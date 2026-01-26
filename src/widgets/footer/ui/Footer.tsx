import { profileData } from '@/shared';
import { SocialLinks } from '@/shared/ui/SocialLinks';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>{/* 여유 공간 */}</div>
      <SocialLinks
        linkedin={profileData.linkedin.address}
        github={profileData.github.address}
      />
    </footer>
  );
};
