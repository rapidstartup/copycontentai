import React from 'react';
import { Loader2, RotateCw } from 'lucide-react';
import { FormData } from '../types/form';
import FormSection from './FormSection';

interface AvatarFormProps {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  onRegenerate: (field: keyof FormData) => Promise<void>;
  loading: keyof FormData | null;
}

const AvatarForm: React.FC<AvatarFormProps> = ({
  data,
  onChange,
  onRegenerate,
  loading
}) => {
  const handleChange = (id: string, value: string) => {
    onChange({ [id as keyof FormData]: value });
  };

  const sections = [
    {
      title: "Your Information",
      fields: [
        {
          id: 'name' as keyof FormData,
          label: "What is your name?",
          placeholder: "Enter your full name",
          example: "Example: James Hendrix"
        },
        {
          id: 'qualifications' as keyof FormData,
          label: "Why you're qualified (3-5 strong bullets)",
          placeholder: "List your qualifications...",
          example: "Example: 30 years of experience in network marketing",
          type: 'textarea'
        }
      ]
    },
    {
      title: "Avatar Identity",
      fields: [
        {
          id: 'avatarName' as keyof FormData,
          label: "What is your avatar's name?",
          placeholder: "Enter avatar name",
          example: "Example: Alex"
        },
        {
          id: 'avatarPronoun' as keyof FormData,
          label: "What is your avatar's pronoun?",
          placeholder: "Enter pronoun (he/she/they)",
          example: "Example: she"
        },
        {
          id: 'avatarPersonalPronoun' as keyof FormData,
          label: "What is your avatar's personal pronoun?",
          placeholder: "Enter personal pronoun (him/her/them)",
          example: "Example: her"
        },
        {
          id: 'avatarPossessivePronoun' as keyof FormData,
          label: "What is your avatar's possessive pronoun?",
          placeholder: "Enter possessive pronoun (his/her/their)",
          example: "Example: her"
        },
        {
          id: 'avatarCurrentIdentity' as keyof FormData,
          label: "What is your avatar's current identity?",
          placeholder: "Enter current identity",
          example: "Example: busy mom"
        },
        {
          id: 'avatarCurrentIdentityPlural' as keyof FormData,
          label: "What is your avatar's current identity? (PLURAL)",
          placeholder: "Enter plural identity",
          example: "Example: enthusiastic network marketers"
        },
        {
          id: 'avatarIdealIdentity' as keyof FormData,
          label: "What is your avatar's ideal identity?",
          placeholder: "Enter ideal identity",
          example: "Example: successful leader"
        }
      ]
    },
    {
      title: "Focus Areas",
      fields: [
        {
          id: 'focusArea1' as keyof FormData,
          label: "What is your avatar's #1 most important area of focus?",
          placeholder: "2-3 word keyword phrase",
          example: "Example: lead generation"
        },
        {
          id: 'focusArea2' as keyof FormData,
          label: "What is your avatar's #2 most important area of focus?",
          placeholder: "2-3 word keyword phrase",
          example: "Example: downline recruitment"
        }
      ]
    },
    {
      title: "Desires and Results",
      fields: [
        {
          id: 'longTermDesire1' as keyof FormData,
          label: "What is your avatar's #1 long-term desire?",
          placeholder: "Start with a verb",
          example: "Example: make six figures"
        },
        {
          id: 'longTermDesire2' as keyof FormData,
          label: "What is your avatar's #2 long-term desire?",
          placeholder: "Start with a verb",
          example: "Example: develop a deep downline for generational wealth"
        }
      ]
    },
    {
      title: "Immediate Results",
      fields: [
        {
          id: 'immediateResult1' as keyof FormData,
          label: "What is an immediate result your avatar wants right now?",
          placeholder: "Enter immediate result",
          example: "Example: close contacts as recruits"
        },
        {
          id: 'immediateResult2' as keyof FormData,
          label: "What is another immediate result your avatar wants?",
          placeholder: "Enter immediate result",
          example: "Example: reach out to more leads"
        },
        {
          id: 'immediateResult3' as keyof FormData,
          label: "What is one more immediate result your avatar wants?",
          placeholder: "Enter immediate result",
          example: "Example: activate a new leader in the team"
        }
      ]
    },
    {
      title: "Problems and Pain Points",
      fields: [
        {
          id: 'enemies' as keyof FormData,
          label: "Who are your avatar's enemies? (Plural)",
          placeholder: "Enter enemies",
          example: "Example: nay-sayers"
        },
        {
          id: 'problem1' as keyof FormData,
          label: "What is a problem your avatar needs to solve?",
          placeholder: "Enter problem",
          example: "Example: handle objections"
        },
        {
          id: 'problem2' as keyof FormData,
          label: "What is another problem your avatar needs to solve?",
          placeholder: "Enter problem",
          example: "Example: get team members buying"
        },
        {
          id: 'problem3' as keyof FormData,
          label: "What is one more problem your avatar needs to solve?",
          placeholder: "Enter problem",
          example: "Example: train up new leaders"
        }
      ]
    },
    {
      title: "Pain Points",
      fields: [
        {
          id: 'painPoint1' as keyof FormData,
          label: "What is a pain point that really frustrates your avatar?",
          placeholder: "Enter pain point",
          example: "Example: other leaders grow their teams easily"
        },
        {
          id: 'painPoint2' as keyof FormData,
          label: "What is another pain point that really frustrates your avatar?",
          placeholder: "Enter pain point",
          example: "Example: everyone else seems to have a system that works"
        },
        {
          id: 'painPoint3' as keyof FormData,
          label: "What is one more pain point that really frustrates your avatar?",
          placeholder: "Enter pain point",
          example: "Example: not knowing how to start conversations"
        }
      ]
    },
    {
      title: "Critical Questions",
      fields: [
        {
          id: 'question1' as keyof FormData,
          label: "What is a critical question your avatar needs answered?",
          placeholder: "Enter question",
          example: "Example: how can I build my downline?"
        },
        {
          id: 'question2' as keyof FormData,
          label: "What is another critical question your avatar needs answered?",
          placeholder: "Enter question",
          example: "Example: how do I build systems to automate lead generation?"
        },
        {
          id: 'question3' as keyof FormData,
          label: "What is one more critical question your avatar needs answered?",
          placeholder: "Enter question",
          example: "Example: what are the best ways to start conversations?"
        }
      ]
    },
    {
      title: "Roadblocks and Objections",
      fields: [
        {
          id: 'roadblock1' as keyof FormData,
          label: "What is an objection or roadblock that prevents your avatar from moving forward?",
          placeholder: "Enter roadblock",
          example: "Example: generating leads takes too much time and energy"
        },
        {
          id: 'roadblock2' as keyof FormData,
          label: "What is another objection or roadblock?",
          placeholder: "Enter roadblock",
          example: "Example: reaching six figures requires sacrificing family time"
        },
        {
          id: 'roadblock3' as keyof FormData,
          label: "What is one more objection or roadblock?",
          placeholder: "Enter roadblock",
          example: "Example: selling feels sleazy and manipulative"
        }
      ]
    },
    {
      title: "Bottom Line Results",
      fields: [
        {
          id: 'bottomLineResult1' as keyof FormData,
          label: "When all is said and done, what does your avatar want to be able to do?",
          placeholder: "Enter result",
          example: "Example: build a stable and profitable business"
        },
        {
          id: 'bottomLineResult2' as keyof FormData,
          label: "What else does your avatar want to be able to do?",
          placeholder: "Enter result",
          example: "Example: help their team succeed without constant oversight"
        },
        {
          id: 'bottomLineResult3' as keyof FormData,
          label: "What is one more thing your avatar wants to be able to do?",
          placeholder: "Enter result",
          example: "Example: lead with confidence and vision"
        }
      ]
    },
    {
      title: "Your Solution",
      fields: [
        {
          id: 'productTitle' as keyof FormData,
          label: "What is the Title or Name of your product/service?",
          placeholder: "Enter product title",
          example: "Example: Network Marketing in the AI Age"
        },
        {
          id: 'productType' as keyof FormData,
          label: "What type of product/service is this?",
          placeholder: "Enter product type",
          example: "Example: comprehensive networking toolkit"
        },
        {
          id: 'benefit1' as keyof FormData,
          label: "What is the #1 Big Benefit your offer provides?",
          placeholder: "Start with a verb",
          example: "Example: grow their downline without constant follow-ups"
        },
        {
          id: 'benefit2' as keyof FormData,
          label: "What is the #2 Big Benefit your offer provides?",
          placeholder: "Start with a verb",
          example: "Example: automate their lead generation process"
        },
        {
          id: 'benefit3' as keyof FormData,
          label: "What is the #3 Big Benefit your offer provides?",
          placeholder: "Start with a verb",
          example: "Example: train new team members quickly"
        },
        {
          id: 'mainResult' as keyof FormData,
          label: "What is the #1 Result your avatar gets from your offer?",
          placeholder: "Start with a verb",
          example: "Example: enjoy predictable and consistent income growth"
        },
        {
          id: 'painToAvoid' as keyof FormData,
          label: "What is the #1 Pain your avatar can avoid?",
          placeholder: "Verb ending in ING",
          example: "Example: spending every evening glued to your phone"
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <FormSection
          key={section.title}
          title={section.title}
          fields={section.fields}
          values={data}
          onChange={handleChange}
          onRegenerate={onRegenerate}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default AvatarForm;