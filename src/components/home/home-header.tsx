export function HomeHeader({ name }: { name: string }) {
  return (
    <header className="px-4 pb-1 pt-5">
      <p className="text-sm font-medium text-text-secondary">PSS Społem Białystok</p>
      <h1 className="mt-1 text-[22px] font-bold tracking-tight text-text-primary">
        Dzień dobry, {name}!
      </h1>
    </header>
  );
}
