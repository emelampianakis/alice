import { Program } from './programs.model';
import { Workshop } from './programs.model';

export const PROGRAMS: Program[] = [
  {
    id: 'general',
    type: 'general',
    titleKey: 'programs.general.title',
    descKey: 'programs.general.desc',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    hasVideo: true,
    levelDescKeys: {
      A1: 'programs.general.levels.A1',
      A2: 'programs.general.levels.A2',
      B1: 'programs.general.levels.B1',
      B2: 'programs.general.levels.B2',
      C1: 'programs.general.levels.C1',
    },
  },
  {
    id: 'conversation',
    type: 'conversation',
    titleKey: 'programs.conversation.title',
    descKey: 'programs.conversation.desc',
    levels: ['B1', 'B2', 'C1-C2'],
    hasVideo: true,
    levelDescKeys: {
      B1: 'programs.conversation.levels.B1',
      B2: 'programs.conversation.levels.B2',
      'C1-C2': 'programs.conversation.levels.C1C2',
    },
  },
  {
    id: 'exam',
    type: 'exam',
    titleKey: 'programs.exam.title',
    descKey: 'programs.exam.desc',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    hasVideo: true,
    levelDescKeys: {
      A1: 'programs.exam.levels.A1',
      A2: 'programs.exam.levels.A2',
      B1: 'programs.exam.levels.B1',
      B2: 'programs.exam.levels.B2',
      C1: 'programs.exam.levels.C1',
      C2: 'programs.exam.levels.C2',
    },
  },
  {
    id: 'workshops',
    type: 'workshop',
    titleKey: 'programs.workshops.title',
    descKey: 'programs.workshops.desc',
  },
];

export const WORKSHOPS: Workshop[] = [
  {
    id: 'expatriation',
    titleKey: 'workshops.expatriation.title',
    descKey: 'workshops.expatriation.desc',
    level: 'A2',
    duration: '5 steps',
  },
  {
    id: 'subjonctif',
    titleKey: 'workshops.subjonctif.title',
    descKey: 'workshops.subjonctif.desc',
    level: 'B1',
    duration: '3 lessons',
  },
  {
    id: 'phonetics',
    titleKey: 'workshops.phonetics.title',
    descKey: 'workshops.phonetics.desc',
    level: 'A1',
    duration: '4 lessons',
  },
];
