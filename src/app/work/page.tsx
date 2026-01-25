import { dataService } from '@/features/services/dataService';
import styles from './page.module.css';
import { Header } from '@/widgets/header';
import { ProjectCard } from '@/widgets/project-grid';

export default async function WorkPage() {
  const projects = await dataService.getProjects();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <h2 className={`h2 ${styles.title}`}>Work</h2>
          <div className={styles.grid}>
            <div className={styles.gridColumn}>
              {projects
                .filter((_, index: number) => index % 2 === 0)
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
            <div className={styles.gridColumn}>
              {projects
                .filter((_, index: number) => index % 2 === 1)
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

