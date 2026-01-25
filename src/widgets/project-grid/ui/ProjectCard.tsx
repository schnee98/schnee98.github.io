import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/entities/project';
import styles from './ProjectCard.module.css';
import { ExternalLinkIcon } from '@/shared/ui';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link 
      href={project.link} 
      className={styles.card}
      aria-label={`View project: ${project.title}`}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
          loading="lazy"
          placeholder="blur"
        />
        <div className={styles.button} aria-hidden="true">
          <ExternalLinkIcon width={24} height={24} />
        </div>
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{project.title}</h4>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags} role="list" aria-label="Technologies used">
          {project.tags.map((tag, index) => (
            <span 
              key={tag} 
              className={styles.tag}
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

