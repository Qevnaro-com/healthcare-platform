import React from 'react';
import type { ConfigurableQuestion } from '../../types';

interface DynamicFormRendererProps {
  questions?: ConfigurableQuestion[];
  answers: Record<string, any>;
  onAnswerChange: (fieldId: string, value: any) => void;
}

export const DynamicFormRenderer: React.FC<DynamicFormRendererProps> = ({
  questions = [],
  answers,
  onAnswerChange
}) => {
  const activeQuestions = questions.filter((q) => q.active !== false);

  if (activeQuestions.length === 0) {
    return (
      <div className="p-4 bg-canvas-secondary rounded-xl text-text-muted text-xs border border-border-default">
        Standard care options apply for this service. Proceed to patient & location details.
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      {activeQuestions.map((q) => {
        // Evaluate conditional visibility
        if (q.dependsOn) {
          const parentAnswer = answers[q.dependsOn.fieldId];
          if (String(parentAnswer).toLowerCase() !== String(q.dependsOn.value).toLowerCase()) {
            return null;
          }
        }

        const currentValue = answers[q.id] || '';

        return (
          <div key={q.id} className="p-4 bg-white border border-border-default rounded-xl space-y-2 shadow-subtle">
            <label className="block text-xs font-extrabold text-text-primary">
              {q.label} {q.required && <span className="text-red-500">*</span>}
            </label>

            {q.helpText && (
              <p className="text-[11px] text-text-muted">{q.helpText}</p>
            )}

            {/* Render field type */}
            {q.type === 'yes_no' && (
              <div className="flex items-center gap-3">
                {['yes', 'no'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onAnswerChange(q.id, opt)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all border ${
                      currentValue === opt
                        ? 'bg-brand-teal text-white border-brand-teal shadow-xs'
                        : 'bg-canvas-secondary text-text-secondary border-border-default hover:border-brand-teal-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {q.type === 'single_choice' && (
              <div className="space-y-1.5">
                {(q.options || []).map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-xs font-medium text-text-primary cursor-pointer">
                    <input
                      type="radio"
                      name={q.id}
                      checked={currentValue === opt}
                      onChange={() => onAnswerChange(q.id, opt)}
                      className="text-brand-teal focus:ring-brand-teal"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === 'multi_choice' && (
              <div className="space-y-1.5">
                {(q.options || []).map((opt) => {
                  const currentArr: string[] = Array.isArray(currentValue) ? currentValue : [];
                  const isChecked = currentArr.includes(opt);

                  return (
                    <label key={opt} className="flex items-center gap-2 text-xs font-medium text-text-primary cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            onAnswerChange(q.id, [...currentArr, opt]);
                          } else {
                            onAnswerChange(q.id, currentArr.filter((item) => item !== opt));
                          }
                        }}
                        className="rounded text-brand-teal focus:ring-brand-teal"
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {q.type === 'text' && (
              <input
                type="text"
                value={currentValue}
                onChange={(e) => onAnswerChange(q.id, e.target.value)}
                className="w-full h-9 px-3 text-xs border border-border-default rounded-lg focus:outline-none focus:border-brand-teal"
                placeholder="Enter details..."
              />
            )}

            {q.type === 'textarea' && (
              <textarea
                rows={3}
                value={currentValue}
                onChange={(e) => onAnswerChange(q.id, e.target.value)}
                className="w-full p-3 text-xs border border-border-default rounded-lg focus:outline-none focus:border-brand-teal"
                placeholder="Enter detailed notes..."
              />
            )}

            {q.type === 'number' && (
              <input
                type="number"
                value={currentValue}
                onChange={(e) => onAnswerChange(q.id, e.target.value)}
                className="w-24 h-9 px-3 text-xs border border-border-default rounded-lg focus:outline-none focus:border-brand-teal"
              />
            )}

            {q.type === 'date' && (
              <input
                type="date"
                value={currentValue}
                onChange={(e) => onAnswerChange(q.id, e.target.value)}
                className="h-9 px-3 text-xs border border-border-default rounded-lg focus:outline-none focus:border-brand-teal"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
