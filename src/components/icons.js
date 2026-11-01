import React from 'react';

function Svg({ children, strokeWidth = 1.8, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconBox = (p) => (
  <Svg {...p}>
    <path d="M21 8.5 12 4 3 8.5l9 4.5 9-4.5Z" />
    <path d="M3 8.5V16l9 4.5 9-4.5V8.5" />
    <path d="M12 13v7.5" />
  </Svg>
);
export const IconSearch = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
);
export const IconPlus = (p) => (
  <Svg strokeWidth={2.2} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const IconTrash = (p) => (
  <Svg {...p}>
    <path d="M4 7h16" />
    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    <path d="M10 11v6M14 11v6" />
  </Svg>
);
export const IconEdit = (p) => (
  <Svg {...p}>
    <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z" />
    <path d="m14 8 3 3" />
  </Svg>
);
export const IconGrid = (p) => (
  <Svg {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </Svg>
);
export const IconList = (p) => (
  <Svg {...p}>
    <path d="M8 6h12M8 12h12M8 18h12" />
    <path d="M4 6h.01M4 12h.01M4 18h.01" strokeWidth="2.6" />
  </Svg>
);
export const IconAlert = (p) => (
  <Svg {...p}>
    <path d="M12 4 2.8 19.5a1 1 0 0 0 .9 1.5h16.6a1 1 0 0 0 .9-1.5L12 4Z" />
    <path d="M12 10v4M12 17.3h.01" />
  </Svg>
);
export const IconDollar = (p) => (
  <Svg {...p}>
    <path d="M12 3v18" />
    <path d="M16.5 7.5C16 6 14.3 5 12 5c-2.6 0-4.2 1.2-4.2 3 0 4.2 8.6 2 8.6 6.2 0 1.8-1.8 3-4.4 3-2.4 0-4.2-1-4.7-2.7" />
  </Svg>
);
export const IconTag = (p) => (
  <Svg {...p}>
    <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
    <circle cx="8" cy="8" r="1.2" />
  </Svg>
);
export const IconMenu = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);
export const IconClose = (p) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);
export const IconSun = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);
export const IconMoon = (p) => (
  <Svg {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </Svg>
);
export const IconDownload = (p) => (
  <Svg {...p}>
    <path d="M12 4v11" />
    <path d="m7 11 5 5 5-5" />
    <path d="M5 20h14" />
  </Svg>
);
export const IconReset = (p) => (
  <Svg {...p}>
    <path d="M4 12a8 8 0 1 0 2.5-5.8" />
    <path d="M4 4v4.5h4.5" />
  </Svg>
);
export const IconUndo = (p) => (
  <Svg {...p}>
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h10a6 6 0 0 1 0 12h-3" />
  </Svg>
);
export const IconEmptyBox = (p) => (
  <Svg strokeWidth={1.3} {...p}>
    <path d="M21 8.5 12 4 3 8.5l9 4.5 9-4.5Z" />
    <path d="M3 8.5V16l9 4.5 9-4.5V8.5" />
    <path d="M12 13v7.5" opacity="0.5" />
  </Svg>
);
