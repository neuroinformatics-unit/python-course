type Props = {
  text: string;
};

type InlineToken =
  | { type: "text"; value: string }
  | { type: "code"; value: string }
  | { type: "link"; label: string; href: string }
  | { type: "strong"; value: string }
  | { type: "em"; value: string };

export function InlineText({ text }: Props) {
  return <>{renderInlineParts(text, "inline")}</>;
}

function renderInlineParts(text: string, keyPrefix: string) {
  return tokenizeInline(text).map((token, index) => {
    const key = `${keyPrefix}-${index}-${token.type}-${token.type === "link" ? token.href : token.value}`;

    switch (token.type) {
      case "code":
        return <code key={key}>{token.value}</code>;
      case "link": {
        const isExternal = /^https?:\/\//i.test(token.href);
        const isHashLink = token.href.startsWith("#");
        const openInNewTab = isExternal || isHashLink;
        return (
          <a
            key={key}
            href={token.href}
            target={openInNewTab ? "_blank" : undefined}
            rel={openInNewTab ? "noreferrer noopener" : undefined}
          >
            {token.label}
          </a>
        );
      }
      case "strong":
        return <strong key={key}>{renderInlineParts(token.value, `${key}-strong`)}</strong>;
      case "em":
        return <em key={key}>{renderInlineParts(token.value, `${key}-em`)}</em>;
      default:
        return <span key={key}>{token.value}</span>;
    }
  });
}

function tokenizeInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let cursor = 0;
  let textStart = 0;

  const pushText = (end: number) => {
    if (end > textStart) tokens.push({ type: "text", value: text.slice(textStart, end) });
  };

  while (cursor < text.length) {
    if (text[cursor] === "`") {
      const end = text.indexOf("`", cursor + 1);
      if (end !== -1) {
        pushText(cursor);
        tokens.push({ type: "code", value: text.slice(cursor + 1, end) });
        cursor = end + 1;
        textStart = cursor;
        continue;
      }
    }

    if (text[cursor] === "[") {
      const labelEnd = text.indexOf("](", cursor);
      const hrefEnd = labelEnd === -1 ? -1 : text.indexOf(")", labelEnd + 2);
      if (labelEnd !== -1 && hrefEnd !== -1) {
        pushText(cursor);
        tokens.push({
          type: "link",
          label: text.slice(cursor + 1, labelEnd),
          href: text.slice(labelEnd + 2, hrefEnd),
        });
        cursor = hrefEnd + 1;
        textStart = cursor;
        continue;
      }
    }

    if (text.startsWith("**", cursor)) {
      const end = text.indexOf("**", cursor + 2);
      if (end !== -1) {
        pushText(cursor);
        tokens.push({ type: "strong", value: text.slice(cursor + 2, end) });
        cursor = end + 2;
        textStart = cursor;
        continue;
      }
    }

    if (text[cursor] === "*" && text[cursor + 1] !== "*") {
      const end = text.indexOf("*", cursor + 1);
      if (end !== -1 && text[end + 1] !== "*") {
        pushText(cursor);
        tokens.push({ type: "em", value: text.slice(cursor + 1, end) });
        cursor = end + 1;
        textStart = cursor;
        continue;
      }
    }

    cursor += 1;
  }

  pushText(text.length);
  return tokens;
}
