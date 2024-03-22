"use client";
import { Card } from "@/components/Card";
import DashboardLayout from "@/app/layouts/Dashboard";
import CategoryLayout from "@/app/layouts/CategoryLayout";
import { useQuery } from "@tanstack/react-query";
import { getSubCategories } from "@/API/categories.api";

interface Params {
  params: {
    parentId: string;
  };
  searchParams: {
    page: number;
    limit: number;
    search: string;
  };
}

export default function SubCategory({ params, searchParams }: Params) {
  const { parentId } = params;
  const { page, limit, search } = searchParams;

  // const { data, isLoading } = useQuery({
  //   queryKey: ["sub-categories", page, limit, search, parentId],
  //   queryFn: () => getSubCategories({ id: parentId, page, limit, search }),
  // });

  return (
    <DashboardLayout active={2}>
      <div>
        <CategoryLayout
          title="Sub-Category"
          buttonText="Add a Sub-Category"
          isCategory={false}
          id={parentId}
        >
          <Card
            status="Updated last 28 augest 2023"
            title="Work"
            image="work"
            navigation={false}
            id="id"
          />

          <Card
            status="Updated last 28 augest 2023"
            title="Food"
            image="food"
            navigation={false}
            id="id"
          />
        </CategoryLayout>
      </div>
    </DashboardLayout>
  );
}
