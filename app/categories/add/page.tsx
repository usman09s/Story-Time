'use client'
import DashboardLayout from "@/app/layouts/Dashboard";
import AddingCategories from "@/components/AddingCategories";
import { useSearchParams } from "next/navigation";

export default function AddCategories() {
  const searchParams = useSearchParams();
  const updateId = searchParams.get("id");

  return (
    <DashboardLayout active={2} title={`${updateId ? 'Update a Category' : 'create a Category'}`}>
      <AddingCategories text="Create a Category" />
    </DashboardLayout>
  );
}
