'use client'
import DashboardLayout from "@/app/layouts/Dashboard";
import AddingCategories from "@/components/AddingCategories";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const AddCategories = () => {
  const searchParams = useSearchParams();
  const updateId = searchParams.get("id");

  return (
    <DashboardLayout active={2} title={`${updateId ? 'Update a Category' : 'create a Category'}`}>
      <Suspense fallback={<div>Loading...</div>}>
        <AddingCategories text="Create a Category" />
      </Suspense>
    </DashboardLayout>
  );
}

export default AddCategories