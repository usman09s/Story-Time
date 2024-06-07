import DashboardLayout from "@/app/layouts/Dashboard";
import AddingCategories from "@/components/AddingCategories";

export default function AddSubCategories({
  params,
}: {
  params: { parentId: string };
}) {
  const { parentId } = params;

  return (
    <DashboardLayout active={2} title="Create a Sub Category">
      <AddingCategories text="Create a Sub Category" id={parentId} />
    </DashboardLayout>
  );
}
