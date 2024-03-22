"use client";
import React from "react";
import DashboardLayout from "../layouts/Dashboard";
import CategoryLayout from "../layouts/CategoryLayout";
import { Card } from "@/components/Card";
import { getCategories } from "@/API/categories.api";
import { useQuery } from "@tanstack/react-query";

interface Params {
  searchParams: {
    page: number;
    limit: number;
    search: string;
  };
}

export default function Category({ searchParams }: Params) {
  const { page, limit, search } = searchParams;

  // const { data, isLoading } = useQuery({
  //   queryKey: ["categories", page, limit, search],
  //   queryFn: () => getCategories({ page, limit, search }),
  // });

  return (
    <DashboardLayout active={2}>
      <div>
        <CategoryLayout title="Category" buttonText="Add a Category" isCategory>
          <Card
            status="Updated last 28 augest 2023"
            title="Work"
            image="work"
            navigation
            id="id"
          />

          <Card
            status="Updated last 28 augest 2023"
            title="Food"
            image="food"
            navigation
            id="id"
          />
        </CategoryLayout>
      </div>
    </DashboardLayout>
  );
}
