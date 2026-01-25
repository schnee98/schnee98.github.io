import Image from 'next/image';
import {
  aboutData,
  experienceData,
  educationData,
  profileData,
} from '@/shared';
import styles from './page.module.css';
import { Header } from '@/widgets/header';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Header />

        {/* About Me Section */}
        <section className={styles.section}>
          <h2 className={`h2`}>About me</h2>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutColumn}>
              <h4 className="h4" style={{ fontWeight: 700 }}>{aboutData.title}</h4>
              <p className="paragraph">{aboutData.description}</p>
            </div>
            <div className={styles.profileColumn}>
              <div className={styles.imageWrapper}>
                <Image
                  src={profileData.imageUrl}
                  alt={profileData.name}
                  fill
                  sizes="290px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.contact}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email</span>
                  <a
                    href={`mailto:${profileData.email.address}`}
                    className={styles.contactLink}
                  >
                    {profileData.email.label}
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Github</span>
                  <a
                    href={profileData.github.address}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    {profileData.github.label}
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>LinkedIn</span>
                  <a
                    href={profileData.linkedin.address}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    {profileData.linkedin.label}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className={styles.section}>
          <h3 className="h3">Experience</h3>
          <div className={styles.timeline}>
            {experienceData.map((exp) => (
              <div key={exp.id} className={styles.timelineItem}>
                <p className={styles.timelinePeriod}>{exp.period}</p>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h4 className={styles.timelineTitle}>{exp.company}</h4>
                    <p className={styles.timelineSubtitle}>{exp.position}</p>
                  </div>
                  <ul className={styles.descriptionList}>
                    {exp.description.map((item, index) => (
                      <li key={index}>
                        {item.text}
                        {item.subItems && (
                          <ul className={styles.subList}>
                            {item.subItems.map((subItem, subIndex) => (
                              <li key={subIndex}>{subItem}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className={styles.section}>
          <h3 className="h3">Education</h3>
          <div className={styles.timeline}>
            {educationData.map((education) => (
              <div key={education.id} className={styles.timelineItem}>
                <p className={styles.timelinePeriod}>{education.period}</p>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h2 className={`h3`}>
                      {education.institution}
                      <br />
                    </h2>
                    <h4 className={`h4`}>{education.degree}</h4>
                  </div>
                  <ul className={styles.descriptionList}>
                    {education.description.map((item) => (
                      <li key={item.text}>
                        {item.text}
                        {item.subItems && (
                          <ul className={styles.subList}>
                            {item.subItems.map((subItem) => (
                              <li key={subItem}>{subItem}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

