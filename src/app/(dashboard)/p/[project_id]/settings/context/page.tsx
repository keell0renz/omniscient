import SetContextProject from "@/components/dashboard/project/settings/SetContextProject";

export default function SettingsContext() {
    return (
        <div className="w-full mx-4 lg:w-2/3 max-w-[500px] max-h-[400px] px-8 py-12 mt-24 rounded-md border border-foreground/50">
            <SetContextProject />
        </div>
    );
}