import { S3_URL } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface props {
    image: string,
    category: string
    hasBorder?:boolean
}
export default function StoryTitle({ category, image,hasBorder = false }: props): JSX.Element {
    return (
        <div className={`flex flex-col items-center ${hasBorder ? 'w-40 rounded-lg' : 'bg-[#395E66] p-1 w-28'}  shadow-lg  rounded-md   cursor-pointer`}>
            <div className={`bg-[#56B6A4] w-full items-center flex  gap-2 justify-center  p-1 rounded`}>
                <Image
                    src={`${S3_URL}/${image}`}
                    alt='category'
                    width={hasBorder?35:25}
                    height={30}
                />
                <span className='text-xs text-white '>{category}</span>
            </div>
        </div>
    )
}
