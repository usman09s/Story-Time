"use client";
import { Card } from "@/components/Card";
import DashboardLayout from "@/app/layouts/Dashboard";
import CategoryLayout from "@/app/layouts/CategoryLayout";
import { useQuery } from "@tanstack/react-query";
import { getSubCategories } from "@/API/categories.api";
import { CardSkeleton } from "@/components/skeletons/CardSkeleton";
import { CategoryData } from "@/types/types";
import Pagination from "@/components/helpers/Pagination";

interface Params {
  params: {
    parentId: string;
  };
  searchParams: {
    page: number;
    limit: number;
    search: string;
    name: string;
  };
}

export default function SubCategory({ params, searchParams }: Params) {
  const { parentId } = params;
  const { page, limit, search, name } = searchParams;

  const { data, isLoading } = useQuery<CategoryData>({
    queryKey: ["sub-categories", page, limit, search, parentId],
    queryFn: () => getSubCategories({ id: parentId, page, limit, search }),
  });

  return (
    <DashboardLayout active={2} title="Sub-Category">
      <CategoryLayout
        title={`Sub-Category${name ? `: ${name}` : ""}`}
        buttonText="Add a Sub-Category"
        isCategory={false}
        id={parentId}
      >
        {isLoading ? (
          <CardSkeleton />
        ) : (
          data &&
          data.success &&
          data.response &&
          data.response.categories.length > 0 &&
          data.response.categories.map((cat) => (
            <Card
              key={cat._id}
              status={cat.createdAt}
              title={cat.name}
              image={cat.image}
              navigation={false}
              id={cat._id}
            />
          ))
        )}
      </CategoryLayout>
      {data && data.success && data.response && data.response.pagination && (
        <Pagination data={data.response.pagination} />
      )}
      {!data ||
        (!data.response && (
          <h2 className="text-black text-4xl font-bold ml-10">No results</h2>
        ))}
    </DashboardLayout>
  );
}
