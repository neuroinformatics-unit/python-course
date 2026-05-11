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
            return (
              <a key={`${part}-${index}`} href={href} target="_blank" rel="noreferrer noopener">
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
