"use client";
import React from "react";
import { Card } from "@/components/Card";
import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "@/components/skeletons/CardSkeleton";
import { CategoryData } from "@/types/types";
import Pagination from "@/components/helpers/Pagination";
import DashboardLayout from "@/app/layouts/Dashboard";
import CategoryLayout from "@/app/layouts/CategoryLayout";

interface props {
  queryFn: () => Promise<CategoryData>;
  queryKey: any[];
  title: string;
  buttonText: string;
  isCategory: boolean;
  parentId?: string;
  name?: string;
}

function CategoryPage({
  queryFn,
  queryKey,
  title,
  buttonText,
  isCategory,
  parentId,
  name,
}: props) {
  const { data, isLoading } = useQuery<CategoryData>({
    queryKey,
    queryFn,
  });


  return (
    <DashboardLayout active={2} title={title}>
      <CategoryLayout title={name ? `${title}: ${name}` : title} buttonText={buttonText} isCategory={isCategory} id={parentId}>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          data?.success &&
          data?.response?.categories.length > 0 &&
          data.response.categories.map((cat) => (
            <Card
              key={cat._id}
              status={isCategory ? new Date(cat.updatedAt) : cat.createdAt}
              title={cat.name}
              image={cat.image}
              navigation={isCategory}
              id={cat._id}
            />
          ))
        )}
      </CategoryLayout>
      {data?.success && data.response?.pagination && <Pagination data={data.response.pagination} />}
    </DashboardLayout>
  );
}

export default CategoryPage;
