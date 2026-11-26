import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Garalane — начало">
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 36 36" fill="none">
          <path
            d="M5 27V15L18 6l13 9v12"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m12 27 6-12 6 12M18 21v6"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span>
        garalane<span className="brand-period">.</span>
      </span>
    </Link>
  );
}
