export type TextComposableVariant =
  | 'heading'
  | 'subheading'
  | 'paragraph'
  | 'quote'
  | 'code'
  | 'callout'
  | 'badge';

export interface TextItem {
  id: string;
  variant: TextComposableVariant;
  title?: string;
  content: string;
  meta?: string;
  timestamp: string;
}

export type FilterType = 'all' | TextComposableVariant;
