'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function GuidelineTabs({path}:{path:string}) {
  const router = useRouter();
  const tabs = [
    { name: 'Terms & Condition', href: '/guideline' },
    { name: 'FAQs', href: '/guideline/faqs' },
    { name: 'About Us', href: '/guideline/about' },
    { name: 'Privacy Policy', href: '/guideline/privacy' },
  ];

  return (
    <div className="flex gap-20 my-14 border-b-2 mb-2">
      {tabs.map((tab, index) => (
        <h4
          key={index}
          className={`font-bold ${path === tab.href ? 'border-b-4 border-[#093732]' : 'opacity-80'}`}
        >
          <Link href={tab.href}>{tab.name}</Link>
        </h4>
      ))}
    </div>
  );
}
