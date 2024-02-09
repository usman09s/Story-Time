'use client'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { formats, modules as module } from './Toolbar';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});





export default function Editor({value}:{value:string}) {
  return (
    <div className=''>
       
        <QuillNoSSRWrapper
          theme='snow'
          modules={module}
          formats={formats}
          className=''
        value={value}
        />
      </div>
    );
  }