import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import {type Category } from "~/types/category";

type CategoryProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  category: Category | null;
  refetch: () => void;
};

const formSchema = z.object({
    id: z.number().optional(),
    name: z.string({ required_error: "Category name is required" }).min(2).max(50),
});

const CategoryForm = ({ open, setOpen, category, refetch }: CategoryProps) => {

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

    const upsertCategory = api.category.upsertCategory.useMutation({
        onSuccess: () => {
            refetch();
            setOpen(false);
            form.reset();
            toast({
                title: "SUCCESS",
                description: `Category successfully ${category ? "updated" : "created"}`,
            });
        },
        onError: () => {
            refetch();
            setOpen(false);
            form.reset();
            toast({
                title: "ERROR",
                description: "Server Error",
                variant: "destructive",
            });
        },
    });

    useEffect(() => {
        if (category) {
            form.setValue('id', category.id)
            form.setValue("name", category.name);
        }
    }, [category, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await upsertCategory.mutateAsync({
            ...values,
        })
    };

    const handleOpenChange = () => {
        setOpen(false);
        form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={() => handleOpenChange()}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>
                {category ? <span>Edit Category</span> : <span>Add Category</span>}
            </DialogTitle>
            </DialogHeader>
            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit as any)}
                className="grid gap-4 py-4"
            >
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-right">Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <DialogFooter className="mt-4">
                <Button
                    onClick={() => handleOpenChange()}
                    type="button"
                    variant="outline"
                >
                    Cancel
                </Button>
                <Button type="submit">
                    {category ? <span>Save</span> : <span>Create</span>}
                </Button>
                </DialogFooter>
            </form>
            </Form>
        </DialogContent>
        </Dialog>
    );
};

export default CategoryForm;
