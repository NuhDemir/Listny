import { useState } from 'react';
import { X } from 'lucide-react';
import { useCreatePlaylist } from '../hooks/useLibrary';

/**
 * CreatePlaylistModal Component - Swiss Style Modal
 * 
 * DESIGN:
 * - Minimal modal design
 * - Clear form inputs
 * - Dark/Light mode support
 */

interface CreatePlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreatePlaylistModal = ({ isOpen, onClose }: CreatePlaylistModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const createPlaylist = useCreatePlaylist();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) return;

        try {
            await createPlaylist.mutateAsync({
                name: name.trim(),
                description: description.trim(),
                isPublic,
            });

            // Reset form
            setName('');
            setDescription('');
            setIsPublic(false);
            onClose();
        } catch (error) {
            console.error('Failed to create playlist:', error);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-black">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Create Playlist</h2>
                    <button
                        onClick={onClose}
                        className="text-black/40 transition-colors hover:text-black dark:text-white/40 dark:hover:text-white"
                        aria-label="Close"
                    >
                        <X className="h-6 w-6" strokeWidth={1.5} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label
                            htmlFor="playlist-name"
                            className="mb-2 block text-sm tracking-tight text-black/60 dark:text-white/60"
                        >
                            Playlist Name
                        </label>
                        <input
                            id="playlist-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="My Awesome Playlist"
                            className="w-full border border-black/10 bg-white px-4 py-3 text-sm tracking-tight text-black placeholder:text-black/40 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white"
                            required
                            autoFocus
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label
                            htmlFor="playlist-description"
                            className="mb-2 block text-sm tracking-tight text-black/60 dark:text-white/60"
                        >
                            Description (Optional)
                        </label>
                        <textarea
                            id="playlist-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add a description..."
                            rows={3}
                            className="w-full resize-none border border-black/10 bg-white px-4 py-3 text-sm tracking-tight text-black placeholder:text-black/40 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white"
                        />
                    </div>

                    {/* Public Checkbox */}
                    <div className="flex items-center gap-3">
                        <input
                            id="playlist-public"
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                            className="h-4 w-4 border-black/10 dark:border-white/10"
                        />
                        <label
                            htmlFor="playlist-public"
                            className="text-sm tracking-tight text-black/60 dark:text-white/60"
                        >
                            Make this playlist public
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-black/10 py-3 text-sm tracking-tight transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim() || createPlaylist.isPending}
                            className="flex-1 border border-black bg-black py-3 text-sm tracking-tight text-white transition-colors hover:bg-black/80 disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/80"
                        >
                            {createPlaylist.isPending ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
