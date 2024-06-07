'use client'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '../components/toolbar';
import { useState } from 'react';
import debounce from 'lodash.debounce';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});


export default function Editor({ value, isFaq, isNotification, onStateChange }: { value: string, isFaq?: boolean, isNotification?: boolean, onStateChange: (newValue: string) => void }) {
  const [context, setContext] = useState(value);

  const debouncedHandleStateChange = debounce((newValue: string) => {
    setContext(newValue);
    onStateChange(newValue);
  }, 400); 

  const handleStateChange = (newValue: string) => {
    debouncedHandleStateChange(newValue);
  };

  return (
    <div className={`${isFaq ? null : null}`}>
      <QuillNoSSRWrapper
        theme='snow'
        onChange={handleStateChange}
        modules={modules}
        formats={formats}
        className={`${isFaq ? ' bg-backColor min-h-[300px] ' : ' '}  text-black  placeholder:text-TextColor3 ${isNotification ? 'min-h-[300px]   text-white ' : 'bg-DarkLight '}`}
        value={context}
      />
    </div>
  );
}