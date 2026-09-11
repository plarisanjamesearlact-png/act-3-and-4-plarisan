import React, { useState } from 'react';
import { Copy, Check, Trash2, Code2, Quote, Heading, AlignLeft, Info, Tag } from 'lucide-react';
import { TextItem, TextComposableVariant } from '../types';

interface TextComposableCardProps {
  key?: React.Key;
  item: TextItem;
  onDelete?: (id: string) => void;
}

export const getVariantIcon = (variant: TextComposableVariant) => {
  switch (variant) {
    case 'heading':
      return <Heading className="w-4 h-4 text-zinc-700" />;
    case 'subheading':
      return <Heading className="w-3.5 h-3.5 text-zinc-600" />;
    case 'paragraph':
      return <AlignLeft className="w-4 h-4 text-zinc-600" />;
    case 'quote':
      return <Quote className="w-4 h-4 text-amber-700" />;
    case 'code':
      return <Code2 className="w-4 h-4 text-blue-600" />;
    case 'callout':
      return <Info className="w-4 h-4 text-emerald-600" />;
    case 'badge':
      return <Tag className="w-4 h-4 text-purple-600" />;
  }
};

export const getVariantLabel = (variant: TextComposableVariant): string => {
  switch (variant) {
    case 'heading':
      return 'Heading';
    case 'subheading':
      return 'Subheading';
    case 'paragraph':
      return 'Paragraph';
    case 'quote':
      return 'Quote';
    case 'code':
      return 'Code';
    case 'callout':
      return 'Callout';
    case 'badge':
      return 'Badge';
  }
};

export function TextComposableCard({ item, onDelete }: TextComposableCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = item.title ? `${item.title}\n${item.content}` : item.content;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article
      id={`composable-item-${item.id}`}
      className="group relative bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-300 transition-colors"
    >
      {/* Composable Meta Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-md bg-zinc-100 flex items-center justify-center">
            {getVariantIcon(item.variant)}
          </span>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
            {getVariantLabel(item.variant)} Composable
          </span>
          {item.meta && (
            <>
              <span className="text-zinc-300 text-xs">·</span>
              <span className="text-xs text-zinc-400">{item.meta}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            id={`btn-copy-${item.id}`}
            type="button"
            onClick={handleCopy}
            title="Copy text"
            className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors inline-flex items-center gap-1 text-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 text-xs font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-zinc-500 text-xs">Copy</span>
              </>
            )}
          </button>
          {onDelete && (
            <button
              id={`btn-delete-${item.id}`}
              type="button"
              onClick={() => onDelete(item.id)}
              title="Delete text item"
              className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Composable Render Area */}
      <div className="space-y-2">
        {item.variant === 'heading' && (
          <div>
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight leading-snug">
              {item.title || item.content}
            </h2>
            {item.title && item.content && (
              <p className="mt-1 text-base text-zinc-600 leading-relaxed font-normal">
                {item.content}
              </p>
            )}
          </div>
        )}

        {item.variant === 'subheading' && (
          <div>
            <h3 className="text-base font-semibold text-zinc-800 tracking-tight">
              {item.title || item.content}
            </h3>
            {item.title && item.content && (
              <p className="mt-1 text-sm text-zinc-600 leading-normal">
                {item.content}
              </p>
            )}
          </div>
        )}

        {item.variant === 'paragraph' && (
          <p className="text-base text-zinc-800 leading-relaxed font-normal">
            {item.content}
          </p>
        )}

        {item.variant === 'quote' && (
          <div className="pl-4 border-l-2 border-amber-600 py-1">
            <blockquote className="text-base italic text-zinc-800 leading-relaxed font-serif">
              "{item.content}"
            </blockquote>
            {item.title && (
              <cite className="block mt-2 text-xs font-medium text-zinc-500 not-italic">
                — {item.title}
              </cite>
            )}
          </div>
        )}

        {item.variant === 'callout' && (
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-lg p-3.5">
            {item.title && (
              <h4 className="text-sm font-semibold text-emerald-950 mb-1">
                {item.title}
              </h4>
            )}
            <p className="text-sm text-emerald-900 leading-relaxed">
              {item.content}
            </p>
          </div>
        )}

        {item.variant === 'code' && (
          <div>
            {item.title && (
              <div className="text-xs font-mono text-zinc-500 mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
                {item.title}
              </div>
            )}
            <pre className="bg-zinc-900 text-zinc-100 text-xs font-mono p-3 rounded-lg overflow-x-auto leading-relaxed border border-zinc-800">
              <code>{item.content}</code>
            </pre>
          </div>
        )}

        {item.variant === 'badge' && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {item.title && (
              <span className="text-sm font-medium text-zinc-700 mr-2">
                {item.title}:
              </span>
            )}
            {item.content.split('·').map((part, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200"
              >
                {part.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Timestamp */}
      <div className="mt-4 pt-2 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Added {item.timestamp}</span>
        <span className="font-mono">ID: {item.id}</span>
      </div>
    </article>
  );
}
