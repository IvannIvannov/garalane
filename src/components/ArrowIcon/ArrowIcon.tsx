type ArrowIconProps = {
  diagonal?: boolean;
};

export default function ArrowIcon({ diagonal = false }: ArrowIconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M5 19 19 5M8 5h11v11" />
      ) : (
        <path d="M4 12h16m-7-7 7 7-7 7" />
      )}
    </svg>
  );
}
