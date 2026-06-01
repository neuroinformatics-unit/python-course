type Props = {
  text: string;
};

export function InlineText({ text }: Props) {
  const parts = text.split(/(`[^`]+`|\[[^\]]+\]\([^\)]+\))/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
        }
        if (part.startsWith("[") && part.includes("](")) {
          const match = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
          if (match) {
            const [, label, href] = match;
            const isExternal = /^https?:\/\//i.test(href);
            const isHashLink = href.startsWith("#");
            const openInNewTab = isExternal || isHashLink;
            return (
              <a
                key={`${part}-${index}`}
                href={href}
                target={openInNewTab ? "_blank" : undefined}
                rel={openInNewTab ? "noreferrer noopener" : undefined}
              >
                {label}
              </a>
            );
          }
        }
        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}
