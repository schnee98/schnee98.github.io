
import { GithubIcon, LinkedInIcon } from '@/shared/ui/Icons';
import styles from './SocialLinks.module.css';

interface SocialLinksProps {
  linkedin?: string;
  github?: string;
}

export const SocialLinks = ({
  linkedin = 'www.linkedin.com',
  github = 'www.github.com',
}: SocialLinksProps) => {
  return (
    <div className={styles.socialLinks}>
      <a
        href={`https://${linkedin}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </a>
      <a
        href={`https://${github}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="GitHub"
      >
        <GithubIcon />
      </a>
    </div>
  );
};

