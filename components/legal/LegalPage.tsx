export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <h1 className="font-display text-3xl text-charcoal sm:text-4xl">{title}</h1>
      <div className="mt-8 flex flex-col gap-4 font-body text-sm leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}
