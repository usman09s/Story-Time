import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
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
