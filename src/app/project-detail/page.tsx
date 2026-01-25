import Image from 'next/image';
import styles from './page.module.css';
import { Header } from '@/widgets/header';

export default function ProjectDetailPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <div className={styles.titleSection}>
            <h2 className="h2">Serenity</h2>
            <div className={styles.tags}>
              <span>Brand identity, Website, Packaging</span>
              <span className={styles.dot} />
              <span>2022</span>
            </div>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="https://framerusercontent.com/images/sample1.jpg"
              alt="Project thumbnail"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className={styles.textSection}>
            <h3 className="h3">The Problem</h3>
            <p className="paragraph">
              Our project management system is inefficient, causing missed
              deadlines, duplicated work, and frustration. Communication is
              unclear, files disorganized, and progress tracking is challenging.
              We lack a centralized hub for data, hindering decision-making and
              evaluation. These issues reduce efficiency, increase stress, and
              impact our work quality, making it vital to find a comprehensive
              solution.
            </p>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="https://framerusercontent.com/images/sample2.jpg"
              alt="Sample project image"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="https://framerusercontent.com/images/sample3.jpg"
              alt="Sample project image"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className={styles.textSection}>
            <h3 className="h3">Proposed solution</h3>
            <p className="paragraph">
              To address these challenges, we will implement a comprehensive
              project management overhaul. We&apos;ll introduce a task
              assignment system, enhance communication channels, and establish a
              clear file organization structure. A centralized hub will provide
              easy access to vital data, improving decision-making and
              evaluation. We&apos;ll also create standardized project update and
              performance metric documentation. This holistic solution will
              streamline processes, reduce stress, and elevate work quality,
              enabling us to better meet client expectations and support our
              business growth.
            </p>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="https://framerusercontent.com/images/sample4.jpg"
              alt="Sample project image"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="https://framerusercontent.com/images/sample5.jpg"
              alt="Sample project image"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
