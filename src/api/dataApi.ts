
import { demoData } from '../data/demoData';
import { computeSectionSum } from '../utils/calculations';
import { ComputedSection } from '../types';

// API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTreeData = async (): Promise<ComputedSection> => {
    await delay(200); //  network delay
    const computed = computeSectionSum(demoData) as ComputedSection;
    console.log('API: Fetching tree data', computed);
    return computed;
};
