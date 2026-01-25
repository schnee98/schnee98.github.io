import Link from 'next/link';
import Image from 'next/image';
import styles from './Logo.module.css';

interface LogoProps {
  href?: string;
  imageUrl?: string;
}

export const Logo = ({
  href = '/',
  imageUrl = 'https://framerusercontent.com/images/6QUvaTn62uUXuHwykrmVItcZhc.png',
}: LogoProps) => {
  return (
    <Link href={href} className={styles.logo}>
      <Image src={imageUrl} alt="Logo" width={48} height={48} />
    </Link>
  );
};
