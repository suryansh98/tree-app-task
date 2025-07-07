import React from 'react';
import { TreeNode } from '../components/TreeNode';
import { useTreeData } from '../hooks/useTreeData';

const Index = () => {
    const { treeData, loading, error, updateSum, updateNote } = useTreeData();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading tree data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!treeData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">No data available</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">Tree Data Explorer</h1>
                        <div className="flex items-center space-x-3">
                            <span className="text-lg font-medium text-gray-700">Grand Total:</span>
                            <div className="bg-green-600 text-white px-6 py-2 rounded-full text-xl font-bold">
                                {treeData.computedSum}
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 mt-2">
                        Explore and edit the hierarchical data structure. Click on sections to expand/collapse, 
                        edit sums and notes by clicking on them.
                    </p>
                </div>

                <div className="space-y-4">
                    <TreeNode
                        node={treeData}
                        path={[]}
                        onUpdateSum={updateSum}
                        onUpdateNote={updateNote}
                        level={0}
                    />
                </div>
            </div>
        </div>
    );
};

export default Index;