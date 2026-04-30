import { Link } from "react-router-dom";
import type { LogoProps } from "./logo.type";

export const MaintoraLogo = ({
  size = 100,
  className,
  to = "/",
  showText = false,
  title = "Maintora",
  subtitle,
  wrapperClassName = "inline-flex items-center gap-3",
  markClassName,
  textClassName,
  titleClassName = "text-[13px] font-black uppercase tracking-[0.18em]",
  subtitleClassName = "text-[10px] font-bold uppercase tracking-[0.2em]",
  ariaLabel = "Go to home page",
}: LogoProps) => {
  return (
    <Link to={to} className={wrapperClassName} aria-label={ariaLabel}>
      <span className={markClassName}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeWidth="12" strokeLinecap="round">
            <path d="M160 100C160 133.137 133.137 160 100 160C85.5 160 72.3 154.8 62 146.2" />
            <path d="M40 100C40 66.8629 66.8629 40 100 40C114.5 40 127.7 45.2 138 43.8" />
          </g>

          <path d="M152 28L170 42L152 56" fill="currentColor" />
          <path d="M48 172L30 158L48 144" fill="currentColor" />

          <path
            d="M75 130V70L100 95L125 70V130"
            stroke="#111818"
            strokeWidth="14"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {showText && (
        <span className={textClassName}>
          <span className={titleClassName}>{title}</span>
          {subtitle && <span className={subtitleClassName}>{subtitle}</span>}
        </span>
      )}
    </Link>
  );
};
