
import { useState, useEffect } from 'react';
import { ComputedSection, Entry } from '../types';
import { fetchTreeData } from '../api/dataApi';
import { updateEntrySum, updateEntryNote, isEntry } from '../utils/calculations';

export const useTreeData = () => {
    const [treeData, setTreeData] = useState<ComputedSection | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await fetchTreeData();
                setTreeData(data);
            } catch (err) {
                setError('Failed to load data');
                console.error('Error loading tree data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const updateSum = (path: string[], newSum: number) => {
        if (!treeData) return;
        
        console.log('Updating sum:', path, newSum);
        const updated = updateEntrySum(treeData, path, newSum) as ComputedSection;
        setTreeData(updated);
    };

    const updateNote = (path: string[], newNote: string) => {
        if (!treeData) return;
        
        console.log('Updating note:', path, newNote);
        const updated = updateEntryNote(treeData, path, newNote) as ComputedSection;
        setTreeData(updated);
    };

    return {
        treeData,
        loading,
        error,
        updateSum,
        updateNote
    };
};
