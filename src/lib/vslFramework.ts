import { FormData } from '../types/form';
import { getOpenAIClient } from './openai';

interface VSLSection {
  grabber: string;
  mainHeadline: string;
  subHeadline: string;
  opener: string;
  story: string;
  transition: string;
  solution: string;
  benefits: string;
  proof: string;
  offer: string;
  close: string;
  ps: string;
}

export async function generateVSLContent(formData: FormData): Promise<VSLSection> {
  const openai = getOpenAIClient();
  
  // Helper function to generate section content
  const generateSection = async (prompt: string): Promise<string> => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { 
          role: 'system', 
          content: 'You are a professional copywriter specializing in video sales letters and sales pages.' 
        },
        { 
          role: 'user', 
          content: `Context about the product/service:
            Product Title: ${formData.productTitle}
            Product Type: ${formData.productType}
            Target Audience: ${formData.avatarCurrentIdentity} (${formData.avatarCurrentIdentityPlural})
            Main Pain Point: ${formData.painToAvoid}
            Main Result: ${formData.mainResult}
            Benefits: ${formData.benefit1}, ${formData.benefit2}, ${formData.benefit3}
            Problems: ${formData.problem1}, ${formData.problem2}, ${formData.problem3}
            Pain Points: ${formData.painPoint1}, ${formData.painPoint2}, ${formData.painPoint3}
            Immediate Results: ${formData.immediateResult1}, ${formData.immediateResult2}, ${formData.immediateResult3}
            Bottom Line Results: ${formData.bottomLineResult1}, ${formData.bottomLineResult2}, ${formData.bottomLineResult3}
            
            ${prompt}
            
            Return only the generated copy without any additional text or explanation.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0]?.message?.content || '';
  };

  // Generate each section in parallel
  const [
    grabber,
    mainHeadline,
    subHeadline,
    opener,
    story,
    transition,
    solution,
    benefits,
    proof,
    offer,
    close,
    ps
  ] = await Promise.all([
    generateSection('Create a grabber sub-headline that hooks the reader instantly'),
    generateSection('Create a high-converting main headline that promises the main benefit'),
    generateSection('Create a compelling sub-headline that builds on the main headline'),
    generateSection('Write an opening section that identifies the problem and creates rapport'),
    generateSection('Create a story section that builds credibility and relatability'),
    generateSection('Write a transition that bridges the story to the solution'),
    generateSection('Present the solution/product in a compelling way'),
    generateSection('Elaborate on the key benefits and transformations'),
    generateSection('Provide proof and credibility elements'),
    generateSection('Present the offer and its unique value'),
    generateSection('Write a compelling close with clear call to action'),
    generateSection('Add a P.S. section that reinforces urgency and value')
  ]);

  return {
    grabber,
    mainHeadline,
    subHeadline,
    opener,
    story,
    transition,
    solution,
    benefits,
    proof,
    offer,
    close,
    ps
  };
} 