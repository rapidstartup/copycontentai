import React from 'react';
import { RotateCw } from 'lucide-react';
import { FormData } from '../types/form';

interface FormSectionProps {
  title: string;
  fields: {
    id: keyof FormData;
    label: string;
    placeholder?: string;
    example?: string;
    type?: 'text' | 'textarea' | 'array';
  }[];
  values: any;
  onChange: (id: string, value: any) => void;
  onRegenerate: (field: string) => void;
  loading?: string | null;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  fields,
  values,
  onChange,
  onRegenerate,
  loading
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {fields.map(({ id, label, placeholder, example, type = 'text' }) => (
        <div key={id} className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <div className="relative">
            {type === 'textarea' ? (
              <textarea
                className="w-full h-24 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={values[id] || ''}
                onChange={(e) => onChange(id, e.target.value)}
                placeholder={placeholder}
              />
            ) : (
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={values[id] || ''}
                onChange={(e) => onChange(id, e.target.value)}
                placeholder={placeholder}
              />
            )}
            <button
              onClick={() => onRegenerate(id)}
              disabled={loading === id}
              className="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <RotateCw className={`w-5 h-5 ${loading === id ? 'animate-spin' : ''}`} />
            </button>
          </div>
          {example && (
            <p className="mt-2 text-sm text-gray-500 italic">
              {example}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormSection;