import React from 'react'
import GuidelinePageComponent from '../layouts/GuidelineLayout'

export default function TermsAndCondition() {
  const type = decodeURIComponent('Terms & Conditions')
  return (
    <GuidelinePageComponent
    tabPath='/guideline'
    title='Terms and Conditions'
    type={"Terms %26 Conditions"}
    key={'Terms'}
    />

  )
}
