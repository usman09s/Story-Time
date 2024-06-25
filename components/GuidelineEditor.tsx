import Editor from "./Editor";
import QuillToolbar from "./toolbar";

export const GuidelineEditor = ({ value, setValue }: {
    value: string,
    setValue: (value: string) => void
  }) => {
    return (
      <div className="border-2 min-h-[650px]">
        <div className="border-b-2 mb-2">
          <QuillToolbar />
        </div>
        <Editor isFaq={false} value={value} onStateChange={(value) => setValue(value)} />
      </div>
    );
  }
  