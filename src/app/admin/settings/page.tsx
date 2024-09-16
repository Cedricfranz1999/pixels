'use client'

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type Category } from "~/types/category";
import { api } from "~/trpc/react";
import { useState } from "react";
import { toast } from "~/components/ui/use-toast";
import CategoryForm from "~/app/_components/category/dialog";
import { PlusIcon } from "lucide-react";

const Settings = () => {
    const [category, setCategory] = useState<Category | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const { data, isLoading, refetch } = api.category.getAllCategories.useQuery()

    const deleteCategory = api.category.deleteCategory.useMutation({
        onSuccess: async () => {
            toast({
                title: "SUCCESS",
                description: "Category successfully deleted",
            });
            await refetch();
        },
    });

    const handleEditCategory = (category: Category) => {
        setOpen(true);
        setCategory(category);
    };
    
    const handleDeleteCategory = async (category: Category) => {
        await deleteCategory.mutateAsync({
            id: category.id,
        });
    };

    return ( 
        <div className="space-y-6">
            <CategoryForm open={open} category={category} setOpen={setOpen} refetch={refetch}/>
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold">Categories</h1>
                <p className="text-sm leading-7 text-muted-foreground">
                List of all categories.
                </p>
            </div>
        </div>
        <Card>
            <CardHeader>
                <div className="flex items-end justify-end">
                    <Button
                        onClick={() => setOpen(true)}
                        size="sm"
                        className="h-8 gap-1"
                    >
                        <PlusIcon className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add category
                        </span>
                    </Button>
                </div>
            </CardHeader>
          <CardContent>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.length ? (
                    data?.map((category: Category, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="hidden sm:table-cell">
                          {category.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {category.key}
                        </TableCell>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell className="w-20">
                          <div className="flex items-start justify-start gap-3">
                            <Button
                              variant={"secondary"}
                              onClick={() => handleEditCategory(category)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant={"destructive"}
                              onClick={() => handleDeleteCategory(category)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="py-10 text-center">
                        No categories found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
     );
}
 
export default Settings;