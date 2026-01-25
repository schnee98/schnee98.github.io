import { Logo } from '@/shared/ui/Logo';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
};

