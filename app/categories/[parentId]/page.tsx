'use client'
import { getSubCategories } from "@/API/categories.api";
import CategoryPage from "@/components/Category";

export default function SubCategory({ params, searchParams }: { params: any; searchParams: any }) {
  const { parentId } = params;
  const { page, limit, search, name } = searchParams;

  return (
    <CategoryPage
      queryFn={() => getSubCategories({ id: parentId, page, limit, search })}
      queryKey={["sub-categories", page, limit, search, parentId]}
      title="Sub-Category"
      buttonText="Add a Sub-Category"
      isCategory={false}
      parentId={parentId}
      name={name}
    />
  );
}
