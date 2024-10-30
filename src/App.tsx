import React, { useState, useMemo } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import AIStarter from './components/AIStarter';
import AvatarForm from './components/AvatarForm';
import { FormData } from './types/form';
import { generateCopy, regenerateField } from './lib/openai';
import { Loader2, Wand2, AlertCircle } from 'lucide-react';

const initialFormData: FormData = {
  productDescription: '',
  name: '',
  qualifications: '',
  avatarName: '',
  pronoun: '',
  personalPronoun: '',
  possessivePronoun: '',
  currentIdentity: '',
  currentIdentityPlural: '',
  idealIdentity: '',
  focus1: '',
  focus2: '',
  desire1: '',
  desire2: '',
  immediateResult1: '',
  immediateResult2: '',
  immediateResult3: '',
  enemies: '',
  problem1: '',
  problem2: '',
  problem3: '',
  pain1: '',
  pain2: '',
  pain3: '',
  question1: '',
  question2: '',
  question3: '',
  roadblock1: '',
  roadblock2: '',
  roadblock3: '',
  bottomLine1: '',
  bottomLine2: '',
  bottomLine3: '',
  productTitle: '',
  productType: '',
  benefit1: '',
  benefit2: '',
  benefit3: '',
  result1: '',
  painToAvoid: ''
};

function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldLoading, setFieldLoading] = useState<keyof FormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isFormComplete = useMemo(() => {
    // Check if all fields are non-empty strings
    return Object.entries(formData).every(([key, value]) => {
      if (key === 'productDescription') return true; // Skip this field in completion check
      return typeof value === 'string' && value.trim() !== '';
    });
  }, [formData]);

  const handleGenerateContent = async (prompt: string) => {
    try {
      setError(null);
      setLoading(true);
      const generatedData = await generateCopy(prompt);
      setFormData(prevData => ({
        ...prevData,
        ...generatedData,
        productDescription: prompt
      }));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRedoContent = async (field: keyof FormData) => {
    try {
      setError(null);
      setFieldLoading(field);
      const newContent = await regenerateField(field, formData);
      setFormData(prevData => ({
        ...prevData,
        [field]: newContent
      }));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setFieldLoading(null);
    }
  };

  const handleFormChange = (updates: Partial<FormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...updates
    }));
  };

  const handleGeneratePage = () => {
    const generatedContent = `
      <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div class="max-w-6xl mx-auto px-4">
            <div class="text-center">
              <p class="text-sm uppercase tracking-wider mb-4">Attention ${formData.currentIdentityPlural}!</p>
              <h1 class="text-4xl md:text-5xl font-bold mb-6">${formData.productTitle}</h1>
              <p class="text-xl md:text-2xl mb-8">Discover How to ${formData.mainResult} Without ${formData.painToAvoid}</p>
              <div class="max-w-3xl mx-auto">
                <p class="text-lg opacity-90">${formData.productDescription}</p>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-6xl mx-auto px-4 py-16">
          <!-- Author Introduction -->
          <div class="text-center mb-16">
            <p class="text-sm text-blue-600 mb-2">From the Desk of ${formData.name}</p>
            <div class="mb-4">
              <p class="text-gray-700 italic">${formData.qualifications}</p>
            </div>
            <p class="text-gray-600 italic mb-6">Dear Fellow ${formData.currentIdentity},</p>
            <div class="prose max-w-3xl mx-auto">
              <p class="text-lg leading-relaxed">
                If you're tired of ${formData.painToAvoid} and ready to finally ${formData.mainResult}, 
                then this will be the most important message you read today.
              </p>
            </div>
          </div>

          <!-- Pain Points Section -->
          <div class="bg-gray-50 rounded-xl p-8 mb-16">
            <h2 class="text-2xl font-bold mb-6 text-center">The 3 Biggest Challenges Every ${formData.currentIdentity} Faces...</h2>
            <div class="grid md:grid-cols-3 gap-8">
              <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="font-semibold mb-3">${formData.problem1}</h3>
                <p class="text-gray-600">${formData.painPoint1}</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="font-semibold mb-3">${formData.problem2}</h3>
                <p class="text-gray-600">${formData.painPoint2}</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="font-semibold mb-3">${formData.problem3}</h3>
                <p class="text-gray-600">${formData.painPoint3}</p>
              </div>
            </div>
          </div>

          <!-- Questions Section -->
          <div class="mb-16">
            <h2 class="text-2xl font-bold text-center mb-8">Ask Yourself...</h2>
            <div class="space-y-4">
              <p class="text-lg">• ${formData.question1}</p>
              <p class="text-lg">• ${formData.question2}</p>
              <p class="text-lg">• ${formData.question3}</p>
            </div>
          </div>

          <!-- Benefits Section -->
          <div class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-12">Introducing ${formData.productTitle}</h2>
            <p class="text-center mb-8">The complete ${formData.productType} designed to help you:</p>
            <div class="grid md:grid-cols-3 gap-8">
              <div class="text-center">
                <h3 class="text-xl font-semibold mb-4">${formData.benefit1}</h3>
                <p class="text-gray-600">${formData.immediateResult1}</p>
              </div>
              <div class="text-center">
                <h3 class="text-xl font-semibold mb-4">${formData.benefit2}</h3>
                <p class="text-gray-600">${formData.immediateResult2}</p>
              </div>
              <div class="text-center">
                <h3 class="text-xl font-semibold mb-4">${formData.benefit3}</h3>
                <p class="text-gray-600">${formData.immediateResult3}</p>
              </div>
            </div>
          </div>

          <!-- Bottom Line Results -->
          <div class="bg-gray-50 rounded-xl p-8 mb-16">
            <h2 class="text-2xl font-bold text-center mb-8">Here's What This Means For You...</h2>
            <div class="space-y-6">
              <p class="text-lg">✓ ${formData.bottomLineResult1}</p>
              <p class="text-lg">✓ ${formData.bottomLineResult2}</p>
              <p class="text-lg">✓ ${formData.bottomLineResult3}</p>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="text-center">
            <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors">
              Yes! I'm Ready To ${formData.longTermDesire1}
            </button>
            <p class="mt-4 text-sm text-gray-600">Join other successful ${formData.currentIdentityPlural} who have transformed their business</p>
          </div>
        </main>
      </div>
    `;
    setContent(generatedContent);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Sales Letter Genie</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section - Spans both columns */}
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div>
            {/* AI Generate Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <p className="text-sm text-gray-600 mb-4">
                Need help filling out this form? Tell me about your product and target audience, and I'll help you get started.
              </p>
              <div className="relative">
                <textarea
                  className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Example: I'm selling a comprehensive network marketing training program that helps busy moms build their downline without sacrificing family time..."
                  value={formData.productDescription}
                  onChange={(e) => handleFormChange({ productDescription: e.target.value })}
                />
                <button
                  onClick={() => handleGenerateContent(formData.productDescription)}
                  disabled={loading || !formData.productDescription.trim()}
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

            {/* Avatar Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <AvatarForm
                data={formData}
                onChange={handleFormChange}
                onRegenerate={handleRedoContent}
                loading={fieldLoading}
              />
            </div>
          </div>

          {/* Preview Column */}
          <div>
            <div className="mb-4 flex justify-end">
              <button
                onClick={handleGeneratePage}
                className="w-full py-3 px-6 rounded-lg text-white font-semibold shadow-lg transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 cursor-pointer transform hover:-translate-y-0.5"
              >
                Generate Page
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {showPreview ? 'Edit Content' : 'View Published Page'}
                </button>
              </div>

              {showPreview ? (
                <Preview content={content} />
              ) : (
                <Editor content={content} onChange={setContent} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;