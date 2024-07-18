import DashboardLayout from "@/app/layouts/Dashboard";
import AddingCategories from "@/components/AddingCategories";
import { Suspense } from "react";

const AddSubCategories = ({params,}: {params: { parentId: string };}) => {
  const { parentId } = params;

  return (
    <DashboardLayout active={2} title="Create a Sub Category">
      <Suspense fallback={<div>Loading...</div>}>
        <AddingCategories text="Create a Sub Category" id={parentId} />
      </Suspense>
    </DashboardLayout>
  );
}


export default AddSubCategories