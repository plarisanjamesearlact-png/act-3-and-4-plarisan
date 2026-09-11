import React, { useRef, useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Search, SlidersHorizontal } from 'lucide-react';
import { TextItem, FilterType, TextComposableVariant } from '../types';
import { TextComposableCard } from './TextComposables';

interface ScrollableListProps {
  items: TextItem[];
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onDeleteItem: (id: string) => void;
}

export function ScrollableList({
  items,
  filter,
  onFilterChange,
  onDeleteItem,
}: ScrollableListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const filterOptions: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All Composables' },
    { id: 'heading', label: 'Headings' },
    { id: 'paragraph', label: 'Paragraphs' },
    { id: 'quote', label: 'Quotes' },
    { id: 'callout', label: 'Callouts' },
    { id: 'code', label: 'Code' },
    { id: 'badge', label: 'Badges' },
  ];

  const filteredItems = items.filter((item) => {
    const matchesFilter = filter === 'all' || item.variant === filter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.meta && item.meta.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 20);
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 20);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [filteredItems]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
      {/* List Toolbar & Filter Bar */}
      <div className="p-4 bg-white border-b border-zinc-200 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search text composables..."
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-800 focus:bg-white transition-all"
          />
        </div>

        {/* Scroll Controls & Item Counter */}
        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-zinc-600">
          <span className="font-medium bg-zinc-100 px-2.5 py-1 rounded-md text-zinc-700">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
          <button
            id="scroll-to-top-btn"
            type="button"
            onClick={scrollToTop}
            disabled={!canScrollUp}
            title="Scroll to top"
            className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none rounded-md transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            id="scroll-to-bottom-btn"
            type="button"
            onClick={scrollToBottom}
            disabled={!canScrollDown}
            title="Scroll to bottom"
            className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none rounded-md transition-colors"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Chips Horizontal Bar */}
      <div className="px-4 py-2.5 bg-zinc-50/80 border-b border-zinc-200 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
        <span className="text-zinc-400 mr-1 flex items-center gap-1">
          <SlidersHorizontal className="w-3 h-3" />
          <span>Filter:</span>
        </span>
        {filterOptions.map((opt) => {
          const isActive = filter === opt.id;
          return (
            <button
              key={opt.id}
              id={`filter-btn-${opt.id}`}
              type="button"
              onClick={() => onFilterChange(opt.id)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full font-medium transition-colors ${
                isActive
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 border border-zinc-200'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        id="scrollable-feed-container"
        className="max-h-[580px] min-h-[320px] overflow-y-auto p-4 space-y-3.5 scroll-smooth overscroll-contain"
      >
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-zinc-500">
            <p className="text-sm font-medium text-zinc-700">No text composables found</p>
            <p className="text-xs text-zinc-400 mt-1">
              Try adjusting your search query or filter settings.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <TextComposableCard
              key={item.id}
              item={item}
              onDelete={onDeleteItem}
            />
          ))
        )}
      </div>

      {/* Scroll Indicator Footer */}
      <div className="px-4 py-2 bg-white border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Scrollable List View</span>
        <span>{canScrollDown ? 'Scroll down for more' : 'Reached end of list'}</span>
      </div>
    </div>
  );
}
