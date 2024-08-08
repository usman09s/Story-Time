import React from 'react'
import {
    AlertDialogContent,
  } from "@/components/ui/alert-dialog";
import { Button } from './ui/button';

export default function ConfirmDialogBox() {
  return (
    <AlertDialogContent className="w-32 h-32">
        <div>
            <p className='font-bold'>Successfully Deleted</p>
            <Button>Back</Button>
        </div>
    </AlertDialogContent>
  )
}
