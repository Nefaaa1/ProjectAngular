import { Test } from './test';
import { Level } from './level';

export interface Exam {
    _id: string;
    label: string;
    description: string;
    price: number;
    test: Test;
    level: Level;
}