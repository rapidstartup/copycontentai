import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface PromptEditorProps {
  initialPrompt: string;
  onSave: (prompt: string) => void;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ initialPrompt, onSave }) => {
  const [prompt, setPrompt] = useState(initialPrompt);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Master Prompt</h2>
        <button
          onClick={() => onSave(prompt)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Prompt
        </button>
      </div>
      <textarea
        className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Edit the master prompt that guides the AI responses..."
      />
    </div>
  );
};

export default PromptEditor;