import { contacts } from "@/constants/contacts";
import { ContactList } from "./ContactList";
import { Segment } from "./Segment";
import { Title } from "./Title";
import styles from "./ResumeHeader.module.css";
import Image from "next/image";

export function ResumeHeader() {
  return (
    <div className={styles["segment-wrapper"]}>
      <Segment textType="bold">
        <Title>박주은</Title>
        <hr />
        <div className={styles["content-wrapper"]}>
          <div className={styles["text-wrapper"]}>
            <h2>Frontend Developer</h2>
            <p>
              안녕하세요. 유연한 사고로 문제를 해결하는 개발자 박주은입니다. 😃
            </p>
            <ContactList contacts={contacts} />
          </div>
          <Image
            alt="profile image"
            width={256}
            height={256}
            src={"/img/profile_image.webp"}
          />
        </div>
      </Segment>
    </div>
  );
}
