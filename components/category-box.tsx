import { StoryType } from '@/types/types';
import video from '@/public/assets/Video.svg';
import text from '@/public/assets/Voice.svg';
import Image from 'next/image';
import React, { useState } from 'react';
import { Sheet, SheetTrigger } from './ui/sheet';
import StorySheet from './story-sheet';
import StoryTitle from './story-title';

interface Props {
    image: string;
    category: string;
    type?: StoryType;
    story:string
}

export default function CategoryBox({ category, image, type , story }: Props): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className='flex gap-3'>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                <StoryTitle category={category} image={image}/>
                </SheetTrigger>
                <StorySheet setOpen={setOpen} story={story} />
            </Sheet>
            <Image
                src={type == 'text' ? text : video}
                alt='category'
                width={15}
                height={30}
            />
        </div>
    );
}
