'use client'
import { getCategories } from "@/API/categories.api";
import CategoryPage from "@/components/Category";

export default function Category({ searchParams }: { searchParams: any }) {
  const { page, limit, search } = searchParams;

  return (
    <CategoryPage
      queryFn={() => getCategories({ page, limit, search })}
      queryKey={["categories", page, limit, search]}
      title="Category"
      buttonText="Add Categories"
      isCategory={true}
    />
  );
}