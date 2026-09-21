import React, { useState } from 'react';
import { useBookings } from '../../context/BookingContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Edit2, CheckCircle2, Eye, EyeOff, ListChecks, HelpCircle } from 'lucide-react';
import type { Service, ConfigurableQuestion } from '../../types';

export const AdminServicesPricingPage: React.FC = () => {
  const { services, toggleServiceActive, updateServiceConfig, updateServiceQuestions, updateDutyChecklist } = useBookings();
  const [questionsModalService, setQuestionsModalService] = useState<Service | null>(null);
  const [checklistModalService, setChecklistModalService] = useState<Service | null>(null);
  const [savedNotice, setSavedNotice] = useState('');

  // Questions editor temporary state
  const [tempQuestions, setTempQuestions] = useState<ConfigurableQuestion[]>([]);
  const [newQuestionLabel, setNewQuestionLabel] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<ConfigurableQuestion['type']>('yes_no');

  // Checklist editor temporary state
  const [tempChecklist, setTempChecklist] = useState<string[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const handleRateChange = (id: string, newRate: number) => {
    updateServiceConfig(id, { pricing: { ...services.find(s => s.id === id)!.pricing, basePrice: newRate } });
  };

  const handleOpenQuestionsEditor = (service: Service) => {
    setQuestionsModalService(service);
    setTempQuestions(service.serviceQuestions || []);
  };

  const handleAddQuestion = () => {
    if (!newQuestionLabel.trim()) return;
    const newQ: ConfigurableQuestion = {
      id: `q_${Date.now()}`,
      label: newQuestionLabel.trim(),
      type: newQuestionType,
      required: true,
      active: true
    };
    setTempQuestions([...tempQuestions, newQ]);
    setNewQuestionLabel('');
  };

  const handleSaveQuestions = () => {
    if (!questionsModalService) return;
    updateServiceQuestions(questionsModalService.id, tempQuestions);
    setQuestionsModalService(null);
    setSavedNotice(`Updated customer booking questions for "${questionsModalService.name}".`);
    setTimeout(() => setSavedNotice(''), 3000);
  };

  const handleOpenChecklistEditor = (service: Service) => {
    setChecklistModalService(service);
    setTempChecklist(service.dutyChecklist || []);
  };

  const handleAddChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    setTempChecklist([...tempChecklist, newChecklistItem.trim()]);
    setNewChecklistItem('');
  };

  const handleSaveChecklist = () => {
    if (!checklistModalService) return;
    updateDutyChecklist(checklistModalService.id, tempChecklist);
    setChecklistModalService(null);
    setSavedNotice(`Updated staff duty checklist for "${checklistModalService.name}".`);
    setTimeout(() => setSavedNotice(''), 3000);
  };

  return (
    <div className="space-y-6 text-left max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border-default pb-4">
        <div>
          <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest">
            Service Catalog & Dynamic Questionnaire Configurator
          </span>
          <h1 className="text-2xl font-extrabold text-text-primary">Admin Dynamic Service Registry</h1>
          <p className="text-text-muted text-xs mt-0.5">
            Control service visibility, base rates, dynamic booking questions, and operational staff duty checklists.
          </p>
        </div>
      </div>

      {savedNotice && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> {savedNotice}
        </div>
      )}

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-border-default shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-text-secondary">
            <thead className="bg-canvas-secondary border-b border-border-default text-text-primary font-extrabold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Visibility</th>
                <th className="p-4">Service & Code</th>
                <th className="p-4">Category</th>
                <th className="p-4">Base Rate (₹)</th>
                <th className="p-4">Dynamic Questions</th>
                <th className="p-4">Duty Checklist</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {services.map((service: Service) => {
                const isActive = service.active !== false;
                return (
                  <tr key={service.id} className="hover:bg-canvas-secondary/60 transition-colors">
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => toggleServiceActive(service.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer border ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {isActive ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3 text-slate-400" />}
                        <span>{isActive ? 'Published' : 'Hidden'}</span>
                      </button>
                    </td>
                    <td className="p-4 font-bold text-text-primary">
                      <span className="block font-extrabold">{service.name}</span>
                      <span className="text-[10px] text-text-muted font-mono">{service.id}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-canvas-teal text-brand-teal rounded-md font-bold text-[10px] border border-teal-200 uppercase">
                        {service.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-text-primary">₹</span>
                        <input
                          type="number"
                          value={service.pricing.basePrice}
                          onChange={(e) => handleRateChange(service.id, Number(e.target.value))}
                          className="w-24 p-1.5 rounded-lg border border-border-default text-xs font-extrabold text-brand-teal focus:outline-none focus:border-brand-teal"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => handleOpenQuestionsEditor(service)}
                        className="text-brand-teal font-extrabold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{(service.serviceQuestions || []).length} Question(s)</span>
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => handleOpenChecklistEditor(service)}
                        className="text-brand-teal font-extrabold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ListChecks className="w-3.5 h-3.5" />
                        <span>{(service.dutyChecklist || []).length} Task(s)</span>
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenQuestionsEditor(service)}
                        leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                        className="text-xs font-bold cursor-pointer"
                      >
                        Edit Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Question Builder Modal */}
      {questionsModalService && (
        <Modal
          isOpen={true}
          onClose={() => setQuestionsModalService(null)}
          title={`Configure Questions: ${questionsModalService.name}`}
          subtitle="Configure questions displayed to customers during Step 1 of the booking wizard."
        >
          <div className="space-y-4 text-xs text-left">
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {tempQuestions.map((q, idx) => (
                <div key={q.id} className="p-3 border border-border-default rounded-xl flex items-center justify-between bg-canvas-secondary">
                  <div>
                    <span className="font-extrabold block text-text-primary">{idx + 1}. {q.label}</span>
                    <span className="text-[10px] text-text-muted font-mono uppercase">Type: {q.type} • Required: {q.required ? 'Yes' : 'No'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTempQuestions(tempQuestions.filter(item => item.id !== q.id))}
                    className="text-red-500 font-bold hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border-default space-y-2">
              <span className="font-extrabold block text-text-primary">Add New Question</span>
              <input
                type="text"
                placeholder="Question Label (e.g. Is catheter care required?)"
                value={newQuestionLabel}
                onChange={(e) => setNewQuestionLabel(e.target.value)}
                className="w-full h-9 px-3 border border-border-default rounded-lg"
              />
              <div className="flex gap-2">
                <select
                  value={newQuestionType}
                  onChange={(e) => setNewQuestionType(e.target.value as ConfigurableQuestion['type'])}
                  className="h-9 px-3 border border-border-default rounded-lg bg-white font-bold"
                >
                  <option value="yes_no">Yes / No Toggle</option>
                  <option value="single_choice">Single Choice</option>
                  <option value="text">Text Input</option>
                  <option value="textarea">Textarea</option>
                </select>
                <Button type="button" variant="primary" size="sm" onClick={handleAddQuestion}>
                  Add Question
                </Button>
              </div>
            </div>

            <Button onClick={handleSaveQuestions} className="w-full bg-brand-teal text-white font-bold py-2.5">
              Save Questions Config
            </Button>
          </div>
        </Modal>
      )}

      {/* Admin Duty Checklist Builder Modal */}
      {checklistModalService && (
        <Modal
          isOpen={true}
          onClose={() => setChecklistModalService(null)}
          title={`Configure Staff Duty Checklist: ${checklistModalService.name}`}
          subtitle="Define operational tasks assigned staff must complete during their shift."
        >
          <div className="space-y-4 text-xs text-left">
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {tempChecklist.map((item, idx) => (
                <div key={idx} className="p-3 border border-border-default rounded-xl flex items-center justify-between bg-canvas-secondary">
                  <span className="font-semibold text-text-primary">{idx + 1}. {item}</span>
                  <button
                    type="button"
                    onClick={() => setTempChecklist(tempChecklist.filter((_, i) => i !== idx))}
                    className="text-red-500 font-bold hover:underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border-default space-y-2">
              <span className="font-extrabold block text-text-primary">Add Task Item</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Task Description (e.g. Sterile dressing check & vitals charting)"
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  className="flex-1 h-9 px-3 border border-border-default rounded-lg"
                />
                <Button type="button" variant="primary" size="sm" onClick={handleAddChecklistItem}>
                  Add Task
                </Button>
              </div>
            </div>

            <Button onClick={handleSaveChecklist} className="w-full bg-brand-teal text-white font-bold py-2.5">
              Save Duty Checklist Config
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
