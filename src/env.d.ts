declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.svg?react" {
  import React from "react";

  const ReactComponent: React.FunctionComponent<React.ComponentProps<"svg">> & {
    title?: string;
  };

  export default ReactComponent;
}
