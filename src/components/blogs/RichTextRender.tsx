interface Block {
  type: string;
  text?: string;
  items?: string[];
}
export default function RichContentRenderer({ content }: { content: Block[] }) {
  return content.map((block, index) => {
    if (block.type === "paragraph") {
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {block.text}
        </p>
      );
    }
    if (block.type === "heading") {
      return (
        <h2
          key={index}
          className="text-4xl font-semibold text-primary mt-8 mb-4"
        >
          {block.text}
        </h2>
      );
    }
    if (block.type === "list") {
      return (
        <ul
          key={index}
          className="list-disc list-inside text-gray-700 mt-4 ml-4"
        >
          {block.items && block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }
    return null;
  });
}
