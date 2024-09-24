import { S3_URL } from '@/lib/utils';
import { StoryType } from '@/types/types';
import video from '@/public/assets/Video.svg';
import text from '@/public/assets/Voice.svg';
import Image from 'next/image';
import React from 'react';

interface Props {
    image: string;
    category: string;
    type?: StoryType;
}

export default function CategoryBox({ category, image, type }: Props): JSX.Element {
    return (
        <div className='flex gap-3'>
        <div className={`flex flex-col items-center bg-[#395E66] shadow-lg p-1 rounded-md ${type == "video" ? 'w-[80px]' : 'w-28'}`}>
            <div className={`bg-[#56B6A4] w-full items-center flex ${type == "video" ? 'py-2' : 'items-center gap-2'} justify-center  p-1 rounded`}>
                <Image
                    src={`${S3_URL}/${image}`}
                    alt='category'
                    width={25}
                    height={30}
                />
                  {type == "text" &&
                <span className='text-xs text-white '>{category}</span>
            }
            </div>
            {type == "video" &&
                <span className='mt-1 text-sm font-bold text-white text-center'>{category}</span>
            }
        </div>
        <Image
            src={type == 'text'? text : video}
            alt='category'
            width={15}
            height={30}
        />
        </div>
    );
}
