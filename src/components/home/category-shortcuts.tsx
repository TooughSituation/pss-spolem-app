import Link from "next/link";
import { getShortcut } from "@/lib/data/home-sections";

export function CategoryShortcuts({ ids }: { ids: string[] }) {
  const items = ids
    .map((id) => getShortcut(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (!items.length) return null;

  return (
    <div className="grid grid-cols-5 gap-2 px-4">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="flex flex-col items-center gap-1.5 text-center"
        >
          <span className="grid size-12 place-items-center rounded-xl bg-accent-light text-xl">
            {item.emoji}
          </span>
          <span className="text-[11px] font-semibold leading-tight text-text-primary">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
