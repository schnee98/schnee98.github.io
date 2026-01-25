import { Header } from '@/widgets/header';
import styles from './not-found.module.css';
import { Button } from '@/shared/ui/Button';

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <div className={styles.wrapper}>
            <div className={styles.text}>
              <h2 className="h2">Whoops!</h2>
              <p className="paragraph">
                It looks like that page doesn&apos;t exist. Please check the URL
                and try again.
              </p>
            </div>
            <Button href="/" variant="secondary">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
