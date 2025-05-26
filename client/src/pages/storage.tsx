import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertStorageItemSchema, type StorageItem, type InsertStorageItem } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { formatCurrency } from "@/lib/utils";
import { t, isRTL } from "@/lib/i18n";

type StorageItemFormValues = InsertStorageItem;

export default function Storage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StorageItem | null>(null);
  const queryClient = useQueryClient();

  const { data: storageItems = [], isLoading } = useQuery<StorageItem[]>({
    queryKey: ["/api/storage"],
  });

  const addItemMutation = useMutation({
    mutationFn: (values: StorageItemFormValues) =>
      apiRequest("/api/storage", {
        method: "POST",
        body: JSON.stringify(values),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/storage"] });
      setIsAddDialogOpen(false);
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ id, ...values }: StorageItemFormValues & { id: number }) =>
      apiRequest(`/api/storage/${id}`, {
        method: "PUT",
        body: JSON.stringify(values),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/storage"] });
      setEditingItem(null);
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/storage/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/storage"] });
    },
  });

  const form = useForm<StorageItemFormValues>({
    resolver: zodResolver(insertStorageItemSchema),
    defaultValues: {
      itemName: "",
      quantityInTons: 0,
      purchasePricePerTon: 0,
    },
  });

  const editForm = useForm<StorageItemFormValues>({
    resolver: zodResolver(insertStorageItemSchema),
    defaultValues: {
      itemName: "",
      quantityInTons: 0,
      purchasePricePerTon: 0,
    },
  });

  function onSubmit(values: StorageItemFormValues) {
    addItemMutation.mutate(values);
  }

  function onEditSubmit(values: StorageItemFormValues) {
    if (editingItem) {
      updateItemMutation.mutate({ ...values, id: editingItem.id });
    }
  }

  function handleEdit(item: StorageItem) {
    setEditingItem(item);
    editForm.reset({
      itemName: item.itemName,
      quantityInTons: item.quantityInTons,
      purchasePricePerTon: item.purchasePricePerTon,
    });
  }

  function handleDelete(id: number) {
    deleteItemMutation.mutate(id);
  }

  // Calculate summary statistics
  const totalStorageValue = storageItems.reduce((sum, item) => 
    sum + (item.quantityInTons * item.purchasePricePerTon), 0
  );
  const totalItems = storageItems.length;
  const averagePricePerTon = totalItems > 0 
    ? storageItems.reduce((sum, item) => sum + item.purchasePricePerTon, 0) / totalItems
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={isRTL() ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('storageManagement')}</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t('addNewItem')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('addItem')}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="itemName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('itemName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('itemNamePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantityInTons"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('quantityInTons')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder={t('quantityPlaceholder')} 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="purchasePricePerTon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('purchasePricePerTon')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder={t('pricePlaceholder')} 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    {t('cancel')}
                  </Button>
                  <Button type="submit" disabled={addItemMutation.isPending}>
                    {addItemMutation.isPending ? t('adding') : t('save')}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalStorageValue')}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalStorageValue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalItems')}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('averagePricePerTon')}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averagePricePerTon)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('storage')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('itemName')}</TableHead>
                <TableHead>{t('quantityInTons')}</TableHead>
                <TableHead>{t('purchasePricePerTon')}</TableHead>
                <TableHead>{t('totalCost')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storageItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.itemName}</TableCell>
                  <TableCell>{item.quantityInTons.toLocaleString()}</TableCell>
                  <TableCell>{formatCurrency(item.purchasePricePerTon)}</TableCell>
                  <TableCell>{formatCurrency(item.quantityInTons * item.purchasePricePerTon)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog open={editingItem?.id === item.id} onOpenChange={(open) => !open && setEditingItem(null)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t('editItem')}</DialogTitle>
                          </DialogHeader>
                          <Form {...editForm}>
                            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                              <FormField
                                control={editForm.control}
                                name="itemName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t('itemName')}</FormLabel>
                                    <FormControl>
                                      <Input placeholder={t('itemNamePlaceholder')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={editForm.control}
                                name="quantityInTons"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t('quantityInTons')}</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        placeholder={t('quantityPlaceholder')} 
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={editForm.control}
                                name="purchasePricePerTon"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t('purchasePricePerTon')}</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        placeholder={t('pricePlaceholder')} 
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => setEditingItem(null)}>
                                  {t('cancel')}
                                </Button>
                                <Button type="submit" disabled={updateItemMutation.isPending}>
                                  {updateItemMutation.isPending ? t('updating') : t('save')}
                                </Button>
                              </div>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t('deleteConfirmation')}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {t('confirmDelete')}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t('no')}</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)}>
                              {t('yes')}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}