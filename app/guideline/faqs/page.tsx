import { getGuideline } from '@/API/guideline.api'
import GuidelinePageComponent from '@/app/layouts/GuidelineLayout'
import { ManageFAqs } from '@/components/ManageFAQs'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function page() {
  return (
    <>
      <GuidelinePageComponent
        tabPath='/guideline/faqs'
        title='FAQs'
        type='FAQs'
        key={'FAQs'}
      >
        <ManageFAqs />
      </GuidelinePageComponent>
    </>
  )
}
