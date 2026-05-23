export const renderDescription = (description: string) => {
  const lines = description.split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (!listItems.length) return;
    blocks.push(
      <ul key={key} className="ml-5 list-disc space-y-1 text-sm leading-6 text-inherit">
        {listItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) {
      flushList(`list-${idx}`);
      return;
    }

    if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
      return;
    }

    flushList(`list-${idx}`);
    blocks.push(
      <p key={`p-${idx}`} className="mb-2 text-sm leading-7 text-inherit">
        {line}
      </p>,
    );
  });

  flushList('list-end');
  return blocks;
};
