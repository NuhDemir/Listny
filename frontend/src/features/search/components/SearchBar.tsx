import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchSuggestions } from '../hooks/useSearch';

/**
 * SearchBar Component - Swiss Style Search Input
 * 
 * DESIGN:
 * - Minimal, functional design
 * - Clear typography
 * - Autocomplete suggestions
 * - Keyboard navigation
 * - Dark/Light mode support
 * 
 * INTERACTION:
 * - Real-time suggestions
 * - Clear button
 * - Enter to search
 * - Escape to close
 */

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: (query: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
}

export const SearchBar = ({
    value,
    onChange,
    onSearch,
    placeholder = 'Search songs, albums, artists...',
    autoFocus = false,
}: SearchBarProps) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const { data: suggestions } = useSearchSuggestions(value, showSuggestions);

    const allSuggestions = suggestions
        ? [
            ...suggestions.songs.map((s) => ({ type: 'song', value: s })),
            ...suggestions.artists.map((a) => ({ type: 'artist', value: a })),
            ...suggestions.albums.map((a) => ({ type: 'album', value: a })),
        ]
        : [];

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!showSuggestions) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex((prev) =>
                        prev < allSuggestions.length - 1 ? prev + 1 : prev
                    );
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (selectedIndex >= 0) {
                        const selected = allSuggestions[selectedIndex];
                        onChange(selected.value);
                        onSearch(selected.value);
                    } else {
                        onSearch(value);
                    }
                    setShowSuggestions(false);
                    break;
                case 'Escape':
                    setShowSuggestions(false);
                    setSelectedIndex(-1);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showSuggestions, selectedIndex, allSuggestions, value, onChange, onSearch]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(e.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        setShowSuggestions(newValue.length >= 2);
        setSelectedIndex(-1);
    };

    const handleClear = () => {
        onChange('');
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.focus();
    };

    const handleSuggestionClick = (suggestion: string) => {
        onChange(suggestion);
        onSearch(suggestion);
        setShowSuggestions(false);
        setSelectedIndex(-1);
    };

    return (
        <div className="relative w-full">
            {/* Search Input */}
            <div className="relative">
                <Search
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40 dark:text-white/40"
                    strokeWidth={1.5}
                />
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={() => value.length >= 2 && setShowSuggestions(true)}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    className="w-full border border-black/10 bg-white py-4 pl-12 pr-12 text-base tracking-tight text-black placeholder:text-black/40 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white"
                />
                {value && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 transition-colors hover:text-black dark:text-white/40 dark:hover:text-white"
                        aria-label="Clear search"
                    >
                        <X className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && allSuggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute z-50 mt-2 w-full border border-black/10 bg-white shadow-lg dark:border-white/10 dark:bg-black"
                >
                    {allSuggestions.map((suggestion, index) => (
                        <button
                            key={`${suggestion.type}-${suggestion.value}`}
                            onClick={() => handleSuggestionClick(suggestion.value)}
                            className={`w-full px-4 py-3 text-left text-sm tracking-tight transition-colors ${index === selectedIndex
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'text-black hover:bg-black/5 dark:text-white dark:hover:bg-white/5'
                                }`}
                        >
                            <span className={`mr-2 text-xs uppercase ${index === selectedIndex
                                ? 'text-white/60 dark:text-black/60'
                                : 'text-black/40 dark:text-white/40'
                                }`}>
                                {suggestion.type}
                            </span>
                            {suggestion.value}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
