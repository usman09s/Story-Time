import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { MoveLeft } from 'lucide-react';
import Story from './story';

interface props {
    setOpen: (trigger: boolean) => void;
    story:string
}

export default function StorySheet({ setOpen,story }: props): JSX.Element {
    // TODO fix this component for video
    return (
        <SheetContent className="w-full sm:max-w-md"> 
            <SheetHeader className="border-b pb-4 mb-4">
                <SheetTitle className="font-bold flex items-center">
                    <MoveLeft onClick={() => setOpen(false)} className='cursor-pointer' />
                    <div className='flex-1 text-center mr-6'>
                        <p>POST</p>
                    </div>
                </SheetTitle>
            </SheetHeader>
         <Story id={story} />
        </SheetContent>
    )
}
