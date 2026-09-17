import React, { useState, useMemo } from 'react';
import { clsx } from 'clsx';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { Skeleton } from './Skeleton';

export interface Column<T> {
  key: string;
  header: string;
  accessor?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  title?: string;
  description?: string;
  isLoading?: boolean;
  searchPlaceholder?: string;
  searchFilterKey?: keyof T | ((item: T) => string);
  onRowClick?: (item: T) => void;
  actions?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  pageSize?: number;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  title,
  description,
  isLoading = false,
  searchPlaceholder = 'Search records...',
  searchFilterKey,
  onRowClick,
  actions,
  emptyTitle = 'No data found',
  emptyDescription = 'There are no records matching your request.',
  pageSize = 8,
  className
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered & Searched Data
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();
    return data.filter((item) => {
      if (typeof searchFilterKey === 'function') {
        return searchFilterKey(item).toLowerCase().includes(term);
      }
      if (searchFilterKey && item[searchFilterKey as string]) {
        return String(item[searchFilterKey as string]).toLowerCase().includes(term);
      }
      // Default fuzzy search over all text values
      return Object.values(item).some(
        (val) => val && String(val).toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm, searchFilterKey]);

  // Sorted Data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
  }, [filteredData, sortKey, sortOrder]);

  // Paginated Data
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;
    if (sortKey === key) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else {
        setSortKey(null);
        setSortOrder('asc');
      }
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className={clsx('bg-white border border-border-default rounded-surface shadow-subtle overflow-hidden space-y-0', className)}>
      {/* Table Header Controls & Search */}
      {(title || description || searchPlaceholder || actions) && (
        <div className="p-4 sm:p-5 border-b border-border-default flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-canvas-secondary">
          {(title || description) && (
            <div>
              {title && <h3 className="font-extrabold text-text-primary text-base">{title}</h3>}
              {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {searchPlaceholder && (
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={searchPlaceholder}
                  className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-border-default rounded-control focus:border-brand-teal focus:outline-none shadow-2xs"
                />
              </div>
            )}
            {actions}
          </div>
        </div>
      )}

      {/* Desktop Enterprise Table View */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-canvas-tertiary text-text-muted uppercase text-[10px] font-extrabold tracking-wider border-b border-border-default sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key, col.sortable)}
                  className={clsx(
                    'px-4 py-3 select-none',
                    col.sortable && 'cursor-pointer hover:text-text-primary transition-colors',
                    col.className
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-slate-400">
                        {sortKey === col.key ? (
                          sortOrder === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-brand-teal" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-brand-teal" />
                          )
                        ) : (
                          <ChevronDown className="w-3 h-3 opacity-40" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border-default/80 bg-white">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx}>
                  <td colSpan={columns.length} className="px-4 py-3">
                    <Skeleton className="h-6 w-full rounded-md" />
                  </td>
                </tr>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item) => {
                const key = keyExtractor(item);
                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={clsx(
                      'transition-colors hover:bg-canvas-secondary/80',
                      onRowClick && 'cursor-pointer'
                    )}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className={clsx('px-4 py-3.5 text-text-secondary font-medium', col.className)}>
                        {col.accessor ? col.accessor(item) : item[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : null}
          </tbody>
        </table>

        {!isLoading && paginatedData.length === 0 && (
          <div className="py-12">
            <EmptyState title={emptyTitle} description={emptyDescription} />
          </div>
        )}
      </div>

      {/* Table Pagination Footer */}
      {!isLoading && sortedData.length > 0 && (
        <div className="px-4 py-3 border-t border-border-default bg-canvas-secondary flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted font-medium">
          <div>
            Showing <strong className="text-text-primary font-bold">{((currentPage - 1) * pageSize) + 1}</strong> to{' '}
            <strong className="text-text-primary font-bold">{Math.min(currentPage * pageSize, sortedData.length)}</strong> of{' '}
            <strong className="text-text-primary font-bold">{sortedData.length}</strong> results
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 px-2.5 text-xs border-border-default"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </Button>
            <span className="px-3 text-xs font-bold text-text-primary">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 px-2.5 text-xs border-border-default"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
