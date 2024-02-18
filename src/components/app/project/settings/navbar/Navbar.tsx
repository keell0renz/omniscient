
export default function SettingsNavbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-96 px-12 mt-20 flex flex-col gap-2 text-lg h-full items-start font-mono">
        {children}
    </div>
  );
}
