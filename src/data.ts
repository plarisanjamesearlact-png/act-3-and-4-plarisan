import { TextItem } from './types';

export const INITIAL_TEXT_ITEMS: TextItem[] = [
  {
    id: '1',
    variant: 'heading',
    title: 'Text Composables Overview',
    content: 'Modular typography primitives designed for structured and accessible visual hierarchy.',
    meta: 'Level 1 Heading Composable',
    timestamp: 'Just now',
  },
  {
    id: '2',
    variant: 'paragraph',
    content:
      'Composables allow frontend interfaces to maintain strict typographic rhythm, balanced tracking, and proportional line heights (1.5–1.7 ratio) across responsive screens.',
    meta: 'Body Text Composable · 68 characters per line optimal width',
    timestamp: '2m ago',
  },
  {
    id: '3',
    variant: 'quote',
    title: 'Antoine de Saint-Exupéry',
    content:
      'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.',
    meta: 'Editorial Blockquote Composable',
    timestamp: '5m ago',
  },
  {
    id: '4',
    variant: 'callout',
    title: 'Developer Tip',
    content:
      'Wrap variable text strings inside dedicated composable blocks to decouple typography rules from layout wrappers.',
    meta: 'Information Note Composable',
    timestamp: '12m ago',
  },
  {
    id: '5',
    variant: 'code',
    title: 'SimpleTextComposable.tsx',
    content: `// Reusable Text Composable Component
export function TextParagraph({ text }: { text: string }) {
  return (
    <p className="text-base text-zinc-700 leading-relaxed font-normal">
      {text}
    </p>
  );
}`,
    meta: 'Monospace Code Composable',
    timestamp: '18m ago',
  },
  {
    id: '6',
    variant: 'subheading',
    title: 'Responsive Fluid Scrolling',
    content: 'Scrollable containers provide overflow containment while retaining natural momentum.',
    meta: 'Subheading Composable · Inter 500 Medium',
    timestamp: '25m ago',
  },
  {
    id: '7',
    variant: 'badge',
    title: 'Composable Status Indicator',
    content: 'Active · Production Ready · Verified',
    meta: 'Status Pill Composable',
    timestamp: '30m ago',
  },
  {
    id: '8',
    variant: 'paragraph',
    content:
      'When building scrollable feeds in React, ensure list items use stable keys, light DOM nodes, and clean padding boundaries for optimal 60fps scrolling performance.',
    meta: 'Body Text Composable · Performance Tip',
    timestamp: '40m ago',
  },
  {
    id: '9',
    variant: 'quote',
    title: 'Dieter Rams',
    content: 'Good design is as little design as possible. Less, but better.',
    meta: 'Design Philosophy Composable',
    timestamp: '1h ago',
  },
  {
    id: '10',
    variant: 'callout',
    title: 'VS Code Migration Available',
    content:
      'You can easily clone or export this project directly to VS Code via the GitHub Integration or ZIP download.',
    meta: 'Migration Notice Composable',
    timestamp: '2h ago',
  },
];
