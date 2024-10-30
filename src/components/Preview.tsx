import React from 'react';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <div className="prose max-w-none">
      <div className="min-h-[600px] bg-white rounded-lg p-6">
        <img
          src="https://placehold.co/1200x400/EEE/31343C"
          alt="Header"
          className="w-full h-auto mb-8 rounded-lg"
        />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default Preview;