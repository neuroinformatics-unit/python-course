type Props = {
  text: string;
};

export function InlineText({ text }: Props) {
  const parts = text.split(/(`[^`]+`)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
        }
        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}
