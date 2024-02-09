import React from "react";
import DashboardLayout from "../layouts/Dashboard";
import { Button } from "@/components/ui/button";
import Guideline from "@/components/guidelines";

export default function GuidelinePage() {
  return (
    <DashboardLayout>
     <Guideline   title="Guideline"  />
    </DashboardLayout>
  );
}
