import GuidelinePageComponent from '@/app/layouts/GuidelineLayout'
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

export const ManageFAqs = () => {
  return (
    <>
      <div className='my-5'>
        <hr />
        <h1 className='text-3xl p-5 text-[#18243C]'>Manage FAQs</h1>
        <div className='w-full shadow-xl'>
        </div>
      </div>
    </>
  )
}