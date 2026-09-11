import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { TextComposableVariant, TextItem } from '../types';

interface AddComposableProps {
  onAdd: (item: Omit<TextItem, 'id' | 'timestamp'>) => void;
}

export function AddComposable({ onAdd }: AddComposableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<TextComposableVariant>('paragraph');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onAdd({
      variant,
      title: title.trim() || undefined,
      content: content.trim(),
      meta: meta.trim() || undefined,
    });

    setTitle('');
    setContent('');
    setMeta('');
    setIsOpen(false);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs">
      {!isOpen ? (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Add Text Composable</h3>
            <p className="text-xs text-zinc-500">
              Append a new heading, quote, code snippet, or body text to the list.
            </p>
          </div>
          <button
            id="open-add-form-btn"
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Item</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h3 className="text-sm font-semibold text-zinc-900">New Text Composable</h3>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs text-zinc-400 hover:text-zinc-700"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">
                Composable Type
              </label>
              <select
                id="select-variant"
                value={variant}
                onChange={(e) => setVariant(e.target.value as TextComposableVariant)}
                className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-zinc-800 focus:ring-1 focus:ring-zinc-800 focus:outline-none"
              >
                <option value="heading">Heading Composable</option>
                <option value="subheading">Subheading Composable</option>
                <option value="paragraph">Paragraph Composable</option>
                <option value="quote">Quote Composable</option>
                <option value="callout">Callout / Note Composable</option>
                <option value="code">Code Snippet Composable</option>
                <option value="badge">Badge / Tag Composable</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">
                Title / Author / File (Optional)
              </label>
              <input
                id="input-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Design Principle or App.tsx"
                className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-zinc-800 focus:ring-1 focus:ring-zinc-800 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">
              Content Text *
            </label>
            <textarea
              id="input-content"
              rows={3}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                variant === 'code'
                  ? 'console.log("Hello from composable");'
                  : 'Type your text composable content here...'
              }
              className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-zinc-800 focus:ring-1 focus:ring-zinc-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">
              Metadata Note (Optional)
            </label>
            <input
              id="input-meta"
              type="text"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              placeholder="e.g. Custom typography spec"
              className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-zinc-800 focus:ring-1 focus:ring-zinc-800 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              id="submit-item-btn"
              type="submit"
              className="px-3.5 py-1.5 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Scrollable List</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
