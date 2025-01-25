"use client";

import ContentSidebar from "../ContentSidebar/ContentSidebar";
import ContentIcon from "@/assets/content-icon.svg";
import { useRotation } from "@/hooks/useRotation";

function ContentMenu() {
  const { clicked, onClick, className } = useRotation();
  const headers = getHeaders();

  return (
    <div>
      <ContentIcon className={className} onClick={onClick} />
      {headers.length > 0 && clicked && (
        <ContentSidebar headers={headers} handleClick={onClick} />
      )}
    </div>
  );
}

function getHeaders() {
  if (document == null) {
    return [];
  }

  const headers = Array.from(
    document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  );

  return headers;
}

export default ContentMenu;
