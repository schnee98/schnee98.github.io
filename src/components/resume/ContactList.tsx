import { ContactContent } from "@/types/types";
import Link from "next/link";

interface Props {
  contacts: Record<string, ContactContent>;
}

export function ContactList(props: Props) {
  return (
    <div>
      {Object.entries(props.contacts).map(([name, content]) => (
        <Content key={name} {...content} />
      ))}
    </div>
  );
}

function Content(props: ContactContent) {
  return (
    <>
      {props.href != null ? (
        <p>
          {props.emoji} <Link href={props.href}>{props.text}</Link>
        </p>
      ) : (
        <p>
          {props.emoji} {props.text}
        </p>
      )}
    </>
  );
}
