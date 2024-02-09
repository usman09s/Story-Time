import React  from "react";
import DashboardLayout from "../layouts/Dashboard";
import CategoryLayout from "../layouts/CategoryLayout";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function Category() {
  return (
    <DashboardLayout active={2}>
      <div>
        <CategoryLayout title="Category" buttonText="Add a Category" isCategory>
       
          <Card
            status="Updated last 28 augest 2023"
            title="Work"
            image="work"
            naviagtion
          />
          
          <Card
            status="Updated last 28 augest 2023"
            title="Food"
            image="food"
            naviagtion
          />
          
        </CategoryLayout>
      </div>
    </DashboardLayout>
  );
}
