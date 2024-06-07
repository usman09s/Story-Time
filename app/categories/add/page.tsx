import DashboardLayout from "@/app/layouts/Dashboard";
import AddingCategories from "@/components/AddingCategories";

export default function AddCategories() {
  return (
    <DashboardLayout active={2} title="Create a Category">
      <AddingCategories text="Create a Category" />
    </DashboardLayout>
  );
}
