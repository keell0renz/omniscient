import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { validateSearchInput } from "@/schema/searchInput";
import { SearchInputType } from "@/types/searchInput";
import { SearchIcon, XIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function ExploreInput() {
    const router = useRouter();

    const form = useForm<SearchInputType>({
        resolver: zodResolver(validateSearchInput),
        defaultValues: {
            input: "",
        },
    });

    function onSubmit(userInput: SearchInputType) {
        const newPath = `/explore?q=${userInput.input}`
        if (newPath && userInput.input) {
            router.push(newPath);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="input"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="w-full h-fit relative flex flex-row flex-nowrap items-center">
                                    <Input
                                        {...field}
                                        className="rounded-full border border-background text-background bg-foreground mt-2 h-11 text-lg font-semibold pr-16"
                                        placeholder="What you would like to learn?"
                                    />
                                    <button type="submit" className="w-fit h-fit">
                                        <SearchIcon className="w-6 h-6 absolute right-3 top-1/2 -translate-y-2 cursor-pointer text-background" />
                                    </button>
                                    {field.value && (
                                        <XIcon
                                            className="w-7 h-7 absolute right-9 top-1/2 -translate-y-2.5 cursor-pointer text-background"
                                            onClick={() => {
                                                form.reset();
                                            }}
                                        />
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}