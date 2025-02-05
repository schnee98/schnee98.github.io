import { PrismLight } from "react-syntax-highlighter";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";

PrismLight.registerLanguage("javascript", javascript);
PrismLight.registerLanguage("typescript", typescript);
PrismLight.registerLanguage("bash", bash);

export default PrismLight;
