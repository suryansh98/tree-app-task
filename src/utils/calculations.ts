
import { Section, Entry, ComputedSection } from '../types';

export const isEntry = (node: Entry | Section): node is Entry => {
    return 'sum' in node && 'note' in node;
};

export const isSection = (node: Entry | Section): node is Section => {
    return 'children' in node && !('sum' in node);
};

export const computeSectionSum = (section: Section | Entry): ComputedSection | Entry => {
    if (isEntry(section)) {
        return section;
    }

    const computedChildren = section.children.map(child => computeSectionSum(child));
    
    const computedSum = computedChildren.reduce((total, child) => {
        if (isEntry(child)) {
            return total + child.sum;
        } else {
            return total + (child as ComputedSection).computedSum;
        }
    }, 0);

    return {
        name: section.name,
        children: computedChildren,
        computedSum
    } as ComputedSection;
};

export const updateEntrySum = (
    section: ComputedSection | Entry, 
    path: string[], 
    newSum: number
): ComputedSection | Entry => {
    if (isEntry(section)) {
        if (path.length === 0) {
            return { ...section, sum: newSum };
        }
        return section;
    }

    if (path.length === 0) {
        return section;
    }

    const [currentName, ...remainingPath] = path;
    const updatedChildren = section.children.map(child => {
        if (child.name === currentName) {
            return updateEntrySum(child, remainingPath, newSum);
        }
        return child;
    });

    const computedSum = updatedChildren.reduce((total, child) => {
        if (isEntry(child)) {
            return total + child.sum;
        } else {
            return total + (child as ComputedSection).computedSum;
        }
    }, 0);

    return {
        ...section,
        children: updatedChildren,
        computedSum
    };
};

export const updateEntryNote = (
    section: ComputedSection | Entry, 
    path: string[], 
    newNote: string
): ComputedSection | Entry => {
    if (isEntry(section)) {
        if (path.length === 0) {
            return { ...section, note: newNote };
        }
        return section;
    }

    if (path.length === 0) {
        return section;
    }

    const [currentName, ...remainingPath] = path;
    const updatedChildren = section.children.map(child => {
        if (child.name === currentName) {
            return updateEntryNote(child, remainingPath, newNote);
        }
        return child;
    });

    return {
        ...section,
        children: updatedChildren
    };
};
