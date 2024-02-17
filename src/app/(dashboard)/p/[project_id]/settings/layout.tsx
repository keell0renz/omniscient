import SettingsNavbar from "@/components/dashboard/project/settings/SettingsNavbar";

type DashboardNavbarProps = {
    children: React.ReactNode,
};

export default async function Layout({ children }: DashboardNavbarProps) {
    return (
        <div className="overflow-hidden container w-full h-full flex flex-row">
            <SettingsNavbar />
            <div className="w-full min-h-[60vh] mx-auto flex justify-center">
                {children}
            </div>
        </div>
    );
}