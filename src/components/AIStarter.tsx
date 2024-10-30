import React, { useState } from 'react';
import { Wand2, Loader2, AlertCircle } from 'lucide-react';

interface AIStarterProps {
  onGenerate: (prompt: string) => Promise<void>;
  loading: boolean;
  error?: string | null;
}

const AIStarter: React.FC<AIStarterProps> = ({ onGenerate, loading, error }) => {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sales Letter Genie</h2>
      
      <div className="space-y-4 mb-6">
        <p>Here's how to create your perfect sales letter:</p>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li>Load your avatar</li>
          <li>Fill out the rest of the form</li>
          <li>Hit the Genie button in each section</li>
          <li>Download your sales letter</li>
          <li>Polish it up... and go make sales!</li>
        </ol>
        <p className="text-gray-600">
          No more struggling with sales copy. No more hours of manual writing. Create compelling sales letters based
          on your avatar in minutes!
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Need help filling out this form? Tell me about your product and target audience, and I'll help you get started.
        </p>
        <div className="relative">
          <textarea
            className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Example: I'm selling a comprehensive network marketing training program that helps busy moms build their downline without sacrificing family time..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={() => onGenerate(prompt)}
            disabled={loading || !prompt.trim()}
            className="absolute right-2 bottom-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStarter;