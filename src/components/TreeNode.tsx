import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ComputedSection, Entry } from '../types';
import { isEntry } from '../utils/calculations';


interface TreeNodeProps {
    node: ComputedSection | Entry;
    path: string[];
    onUpdateSum: (path: string[], sum: number) => void;
    onUpdateNote: (path: string[], note: string) => void;
    level: number;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    path,
    onUpdateSum,
    onUpdateNote,
    level
}) => {
    const [isOpen, setIsOpen] = useState(level < 2);
    const [editingSum, setEditingSum] = useState<string>('');
    const [editingNote, setEditingNote] = useState<string>('');

    const handleSumBlur = () => {
        const newSum = parseFloat(editingSum);
        if (!isNaN(newSum) && isEntry(node)) {
            onUpdateSum(path, newSum);
        }
        setEditingSum('');
    };

    const handleNoteBlur = () => {
        if (editingNote.trim() !== '' && isEntry(node)) {
            onUpdateNote(path, editingNote.trim());
        }
        setEditingNote('');
    };

    const indentLevel = level * 20;

    if (isEntry(node)) {
        return (
            <div className="border rounded-lg p-4 mb-2 bg-white shadow-sm" style={{ marginLeft: indentLevel }}>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{node.name}</h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Sum:</span>
                        <input
                            type="number"
                            value={editingSum || node.sum.toString()}
                            onChange={(e) => setEditingSum(e.target.value)}
                            onFocus={() => setEditingSum(node.sum.toString())}
                            onBlur={handleSumBlur}
                            className="w-20 text-right border rounded px-2 py-1"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Note:
                    </label>
                    <textarea
                        value={editingNote || node.note}
                        onChange={(e) => setEditingNote(e.target.value)}
                        onFocus={() => setEditingNote(node.note)}
                        onBlur={handleNoteBlur}
                        className="w-full text-sm border rounded px-2 py-1"
                        rows={2}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="mb-2" style={{ marginLeft: indentLevel }}>
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex items-center justify-between w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                >
                    <div className="flex items-center">
                        {isOpen ? (
                            <ChevronDown className="h-4 w-4 mr-2 text-blue-600" />
                        ) : (
                            <ChevronRight className="h-4 w-4 mr-2 text-blue-600" />
                        )}
                        <h2 className="font-semibold text-gray-900">{node.name}</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Total:</span>
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {node.computedSum}
                        </div>
                    </div>
                </button>
                {isOpen && (
                    <div className="mt-2 pl-2">
                        {node.children.map((child, index) => (
                            <TreeNode
                                key={`${child.name}-${index}`}
                                node={child}
                                path={[...path, child.name]}
                                onUpdateSum={onUpdateSum}
                                onUpdateNote={onUpdateNote}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};