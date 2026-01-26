import { createContext, useContext, useState, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Song } from '@/types';

interface AudioPlayerContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    queue: Song[];
    playSong: (song: Song) => void;
    pauseSong: () => void;
    togglePlay: () => void;
    nextSong: () => void;
    previousSong: () => void;
    setVolume: (volume: number) => void;
    seekTo: (time: number) => void;
    addToQueue: (song: Song) => void;
    removeFromQueue: (songId: string) => void;
    clearQueue: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const useAudioPlayer = () => {
    const context = useContext(AudioPlayerContext);
    if (!context) {
        throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
    }
    return context;
};

interface AudioPlayerProviderProps {
    children: ReactNode;
}

export const AudioPlayerProvider = ({ children }: AudioPlayerProviderProps) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolumeState] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [queue, setQueue] = useState<Song[]>([]);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playSong = useCallback((song: Song) => {
        setCurrentSong(song);
        setIsPlaying(true);

        if (audioRef.current) {
            audioRef.current.src = song.audioUrl;
            audioRef.current.play();
        }
    }, []);

    const pauseSong = useCallback(() => {
        setIsPlaying(false);
        audioRef.current?.pause();
    }, []);

    const togglePlay = useCallback(() => {
        if (isPlaying) {
            pauseSong();
        } else if (currentSong) {
            setIsPlaying(true);
            audioRef.current?.play();
        }
    }, [isPlaying, currentSong, pauseSong]);

    const nextSong = useCallback(() => {
        if (queue.length > 0) {
            const nextSong = queue[0];
            setQueue(prev => prev.slice(1));
            playSong(nextSong);
        }
    }, [queue, playSong]);

    const previousSong = useCallback(() => {
        // Implement previous song logic
        if (currentTime > 3) {
            seekTo(0);
        }
    }, [currentTime]);

    const setVolume = useCallback((newVolume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        setVolumeState(clampedVolume);
        if (audioRef.current) {
            audioRef.current.volume = clampedVolume;
        }
    }, []);

    const seekTo = useCallback((time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }, []);

    const addToQueue = useCallback((song: Song) => {
        setQueue(prev => [...prev, song]);
    }, []);

    const removeFromQueue = useCallback((songId: string) => {
        setQueue(prev => prev.filter(song => song._id !== songId));
    }, []);

    const clearQueue = useCallback(() => {
        setQueue([]);
    }, []);

    return (
        <AudioPlayerContext.Provider
            value={{
                currentSong,
                isPlaying,
                volume,
                currentTime,
                duration,
                queue,
                playSong,
                pauseSong,
                togglePlay,
                nextSong,
                previousSong,
                setVolume,
                seekTo,
                addToQueue,
                removeFromQueue,
                clearQueue,
            }}
        >
            {children}
            <audio
                ref={audioRef}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onEnded={nextSong}
            />
        </AudioPlayerContext.Provider>
    );
};
