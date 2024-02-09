import DashboardLayout from '@/app/layouts/Dashboard'
import AddingCategories from '@/components/AddingCategories'
import React from 'react'

export default function AddSubCategories() {
  return (
    <DashboardLayout active={2}>
    <div >
      <AddingCategories  title="Create a Sub Category" />
    </div>
  </DashboardLayout>
  )
}
