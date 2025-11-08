import { type SVGProps } from "react";
const SelectedCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={13}
    fill="none"
    {...props}
  >
    <path
      strokeLinecap="round"
      d="m.5 6.572 5.549 4.935a.05.05 0 0 0 .07-.003L16.14.5"
    />
  </svg>
);
export default SelectedCheck;
