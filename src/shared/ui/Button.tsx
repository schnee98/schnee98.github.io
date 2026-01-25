import Link from 'next/link';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'icon';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  openInNewTab?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = 'secondary',
  href,
  onClick,
  openInNewTab = false,
  className = '',
}: ButtonProps) => {
  const buttonClassName = `${styles.button} ${styles[variant]} ${className}`;

  // 외부 링크인 경우
  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      return (
        <a
          href={href}
          className={buttonClassName}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    }

    // 내부 링크인 경우
    return (
      <Link href={href} className={buttonClassName}>
        {children}
      </Link>
    );
  }

  // 일반 버튼인 경우
  return (
    <button type="button" className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};
