import React from 'react'
import storyFrame from '@/public/assets/storyFrame.png'
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
import StoryTitle from './story-title';
import { useQuery } from '@tanstack/react-query';
import { fetchStory } from '@/API/story.api';
import { Story as IStory} from '@/types/types';
import { Skeleton } from './ui/skeleton';

interface props {
    id:string
}

export default function Story({id}:props) {

    const {data:storyData,isLoading} = useQuery<IStory>({
        queryKey:["story",id],
        queryFn:()=>fetchStory(id),
    })
    
    if(isLoading) return <Skeleton className='h-[400px] w-[400px]'></Skeleton>
    if(!storyData) return <div>Something Went Wrong</div>
    return (   
        <div className='relative'>
            <Image
                src={storyFrame}
                alt='story'
                width={500}
                height={300}
            />
            <div className='absolute top-0 text-xs  mt-10 mx-10'>
                <div className='justify-center flex mb-3'>
                <StoryTitle category={storyData?.subCategory.name} image={storyData?.subCategory.image} hasBorder />
                </div>
                <ScrollArea className="h-72 px-3">
                    <p className='  text-white text-wrap w-72'>{storyData.content}</p>
                </ScrollArea>
            </div>
        </div>
    )
}
