import React  from "react";
import { Card } from "@/components/Card";
import DashboardLayout from "@/app/layouts/Dashboard";
import CategoryLayout from "@/app/layouts/CategoryLayout";
import Link from "next/link";

export default function SubCategory() {
  return (
    <DashboardLayout active={2}>
      <div>
        <CategoryLayout title="Sub-Category" buttonText="Add a Sub-Category" isCategory={false}>
            <Card
            status="Updated last 28 augest 2023"
            title="Work"
            image="work"
            naviagtion={false}
          />
          
          <Card
            status="Updated last 28 augest 2023"
            title="Food"
            image="food"
            naviagtion={false}
          />
        </CategoryLayout>
      </div>
    </DashboardLayout>
  );
}
