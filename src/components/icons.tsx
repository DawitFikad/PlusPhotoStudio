import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, className, ...props }: IconProps) {
  return { width: size, height: size, className, ...props };
}

export function IconAperture({ size = 22, className, ...props }: IconProps) {
  return (
    <svg
      {...base({ size, className: `icon-iris ${className ?? ""}`, ...props })}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.2" />
      <g className="iris-blades" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.12">
        <path d="M12 3.2 14.8 9.4 12 12Z" />
        <path d="M20.4 8.4 15.2 11.4 12 12Z" />
        <path d="M18.8 18.6 13.6 15.2 12 12Z" />
        <path d="M7.2 20.2 10.6 14.8 12 12Z" />
        <path d="M3.6 12.8 9.2 13.2 12 12Z" />
        <path d="M7.8 4.6 11 10.2 12 12Z" />
      </g>
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function IconWhatsApp({ size = 18, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.2 19.6 5.6 15.4A8.4 8.4 0 1 1 8.8 18.8L4.2 19.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 9.4c.2-.5.4-.5.7-.5h.6c.2 0 .4.1.4.4l.3 1.4c0 .2 0 .4-.2.5l-.6.6c.6 1.1 1.6 2 2.8 2.6l.7-.6c.1-.1.3-.2.5-.1l1.3.4c.3.1.4.3.4.5v.6c0 .3 0 .5-.5.7-2.3.9-5.2.2-7.1-1.7-1.8-1.8-2.4-4.6-1.3-6.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconPhone({ size = 18, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.2 3.8h2.2l1 3.2-1.6 1.4a11.2 11.2 0 0 0 5.8 5.8l1.4-1.6 3.2 1v2.1c0 .9-.7 1.7-1.6 1.8-6.8.7-12.8-5.3-12.1-12.1.1-.9.9-1.6 1.7-1.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPin({ size = 18, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="10" r="2.1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function IconMail({ size = 18, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.2" y="5.5" width="17.6" height="13" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 7.2 12 13l8-5.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function IconArrow({ size = 16, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h13" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconArrowUp({ size = 16, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17 17 7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7h9v9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconMenu({ size = 22, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h10M4 17h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconClose({ size = 22, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconClock({ size = 18, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 7.5V12l3.2 2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function IconNav({ size = 18, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3.5 20 20.5 12 16.8 4 20.5 12 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck({ size = 16, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 12.2 10.8 15l5.2-6.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconInstagram({ size = 16, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16.7" cy="7.3" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconFacebook({ size = 16, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 8.5h2.5V5.2H14c-2.6 0-4.5 1.8-4.5 4.6V12H7.2v3.2h2.3V21h3.4v-5.8h2.6L16.2 12h-3.3V9.8c0-.7.4-1.3 1.1-1.3Z" fill="currentColor" />
    </svg>
  );
}

export function IconYoutube({ size = 16, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.8" y="6.2" width="18.4" height="11.6" rx="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.4 9.4v5.2L15.4 12 10.4 9.4Z" fill="currentColor" />
    </svg>
  );
}

export function IconFilm({ size = 18, className, ...props }: IconProps) {
  return (
    <svg {...base({ size, className, ...props })} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.4" y="4.4" width="17.2" height="15.2" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7.2 4.4v15.2M16.8 4.4v15.2M3.4 8.2h3.8M3.4 12h3.8M3.4 15.8h3.8M16.8 8.2h3.8M16.8 12h3.8M16.8 15.8h3.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
