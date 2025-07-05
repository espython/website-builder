import React, { memo } from 'react';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';

interface HTMLContentFormProps {
  title: string;
  htmlContent: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

const HTMLContentForm = memo(
  ({
    title,
    htmlContent,
    onTitleChange,
    onContentChange,
  }: HTMLContentFormProps) => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="html-title">Title</Label>
          <Input
            id="html-title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter title for this section"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="html-content">HTML Content</Label>
          <Textarea
            id="html-content"
            value={htmlContent}
            onChange={(e) => onContentChange(e.target.value)}
            rows={10}
            className="font-mono text-sm"
            placeholder="<p>Enter your HTML content here...</p>"
          />
        </div>
      </div>
    );
  }
);

HTMLContentForm.displayName = 'HTMLContentForm';

export default HTMLContentForm;
