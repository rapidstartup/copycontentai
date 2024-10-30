import OpenAI from 'openai';
import { FormData } from '../types/form';

const getOpenAIClient = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your-api-key-here') {
    throw new Error('Please set a valid OpenAI API key in your .env file');
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

export async function generateCopy(description: string): Promise<Partial<FormData>> {
  try {
    const openai = getOpenAIClient();
    
    const prompt = `Based on this product/service description: "${description}", generate a comprehensive sales letter profile. Return ONLY a valid JSON object with these exact keys (no additional text or explanation):

    {
      "name": "string",
      "qualifications": "string",
      "avatarName": "string",
      "pronoun": "string",
      "personalPronoun": "string",
      "possessivePronoun": "string",
      "currentIdentity": "string",
      "currentIdentityPlural": "string",
      "idealIdentity": "string",
      "focus1": "string",
      "focus2": "string",
      "desire1": "string",
      "desire2": "string",
      "immediateResult1": "string",
      "immediateResult2": "string",
      "immediateResult3": "string",
      "enemies": "string",
      "problem1": "string",
      "problem2": "string",
      "problem3": "string",
      "pain1": "string",
      "pain2": "string",
      "pain3": "string",
      "question1": "string",
      "question2": "string",
      "question3": "string",
      "roadblock1": "string",
      "roadblock2": "string",
      "roadblock3": "string",
      "bottomLine1": "string",
      "bottomLine2": "string",
      "bottomLine3": "string",
      "productTitle": "string",
      "productType": "string",
      "benefit1": "string",
      "benefit2": "string",
      "benefit3": "string",
      "result1": "string",
      "painToAvoid": "string"
    }

    Make each field specific and compelling for network marketers. Ensure all fields are filled with meaningful content.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { 
          role: 'system', 
          content: 'You are a professional copywriter specializing in sales letters. You must return only valid JSON without any additional text or explanation.' 
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated from OpenAI');
    }
    
    // Find the JSON object in the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format: No JSON object found');
    }
    
    try {
      const parsedContent = JSON.parse(jsonMatch[0]);
      
      // Validate all required fields are present and non-empty
      const requiredFields = [
        'name', 'qualifications', 'avatarName', 'pronoun', 'personalPronoun',
        'possessivePronoun', 'currentIdentity', 'currentIdentityPlural', 'idealIdentity',
        'focus1', 'focus2', 'desire1', 'desire2', 'immediateResult1', 'immediateResult2',
        'immediateResult3', 'enemies', 'problem1', 'problem2', 'problem3', 'pain1',
        'pain2', 'pain3', 'question1', 'question2', 'question3', 'roadblock1',
        'roadblock2', 'roadblock3', 'bottomLine1', 'bottomLine2', 'bottomLine3',
        'productTitle', 'productType', 'benefit1', 'benefit2', 'benefit3', 'result1',
        'painToAvoid'
      ];

      const missingFields = requiredFields.filter(field => 
        !parsedContent[field] || parsedContent[field].trim() === ''
      );

      if (missingFields.length > 0) {
        throw new Error(`Incomplete response: Missing or empty fields: ${missingFields.join(', ')}`);
      }

      return parsedContent;
    } catch (parseError) {
      if (parseError instanceof SyntaxError) {
        throw new Error('Failed to parse OpenAI response as JSON. Please try again.');
      }
      throw parseError;
    }
  } catch (error: any) {
    if (error.code === 'invalid_api_key') {
      throw new Error('Invalid OpenAI API key. Please check your .env file and add a valid API key.');
    }
    throw new Error(error.message || 'Failed to generate content. Please try again.');
  }
}

export async function regenerateField(field: keyof FormData, currentData: FormData): Promise<string> {
  try {
    const openai = getOpenAIClient();
    
    const prompt = `Based on this context about a network marketing product/service:
    Current Identity: ${currentData.currentIdentity}
    Ideal Identity: ${currentData.idealIdentity}
    Pain Points: ${currentData.pain1}, ${currentData.pain2}, ${currentData.pain3}
    
    Please generate new, specific content for the field: "${field}"
    Make it compelling and tailored to network marketers and their goals.
    Return ONLY the new content, no additional text or explanation.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a professional copywriter specializing in sales letters. Return only the requested content without any additional text.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated from OpenAI');
    }
    
    const trimmedContent = content.trim();
    if (trimmedContent === '') {
      throw new Error('Generated content is empty');
    }
    
    return trimmedContent;
  } catch (error: any) {
    if (error.code === 'invalid_api_key') {
      throw new Error('Invalid OpenAI API key. Please check your .env file and add a valid API key.');
    }
    throw new Error(error.message || 'Failed to regenerate content. Please try again.');
  }
}