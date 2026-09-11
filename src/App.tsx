/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layers, HelpCircle, ArrowUpRight, RotateCcw } from 'lucide-react';
import { TextItem, FilterType } from './types';
import { INITIAL_TEXT_ITEMS } from './data';
import { ScrollableList } from './components/ScrollableList';
import { AddComposable } from './components/AddComposable';
import { MigrationGuideModal } from './components/MigrationGuideModal';

export default function App() {
  const [items, setItems] = useState<TextItem[]>(INITIAL_TEXT_ITEMS);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isMigrationModalOpen, setIsMigrationModalOpen] = useState(false);

  const handleAddItem = (newItem: Omit<TextItem, 'id' | 'timestamp'>) => {
    const item: TextItem = {
      ...newItem,
      id: Date.now().toString(),
      timestamp: 'Just now',
    };
    setItems((prev) => [item, ...prev]);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetList = () => {
    setItems(INITIAL_TEXT_ITEMS);
    setFilter('all');
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 flex flex-col items-center justify-start py-8 px-4 sm:px-6">
      <main className="w-full max-w-3xl space-y-6">
        {/* App Header */}
        <header className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-zinc-900 text-white rounded-xl">
                  <Layers className="w-5 h-5" />
                </span>
                <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
                  Text Composables
                </h1>
              </div>
              <p className="text-sm text-zinc-600">
                Modular typography primitives displayed in a high-performance scrollable list.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                id="open-migration-guide-btn"
                type="button"
                onClick={() => setIsMigrationModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Export to VS Code</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </button>

              <button
                id="reset-list-btn"
                type="button"
                onClick={handleResetList}
                title="Reset list to default items"
                className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl border border-zinc-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Add Composable Form */}
        <AddComposable onAdd={handleAddItem} />

        {/* Scrollable Feed */}
        <section aria-label="Text Composables Feed">
          <ScrollableList
            items={items}
            filter={filter}
            onFilterChange={setFilter}
            onDeleteItem={handleDeleteItem}
          />
        </section>

        {/* Migration Modal */}
        <MigrationGuideModal
          isOpen={isMigrationModalOpen}
          onClose={() => setIsMigrationModalOpen(false)}
        />
      </main>
    </div>
  );
}
