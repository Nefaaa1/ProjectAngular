import { Exam } from './exam';
import { Institut } from './institut';
import { Level } from './level';
import { Test } from './test';

export interface Session {
    _id: string;
    label: string;
    description: string;
    date: Date;
    nbPlaces: number;
    exams: Exam[];
    institut: Institut;
    level: Level;
    test: Test;
    inscrit: string[];
    nbInscrit: number;
}