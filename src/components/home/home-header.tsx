export function HomeHeader({ name }: { name: string }) {
  return (
    <header className="px-4 pb-3 pt-4">
      <h1 className="text-xl font-bold tracking-tight text-text-primary">
        Dzień dobry, {name}!
      </h1>
    </header>
  );
}
