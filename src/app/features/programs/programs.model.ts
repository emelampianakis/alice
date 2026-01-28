export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'C1-C2';

export interface Program {
  id: string;
  titleKey: string;
  descKey: string;
  levels?: Level[];
  levelDescKeys?: Partial<Record<Level, string>>;
  type: 'general' | 'conversation' | 'exam' | 'workshop';
  hasVideo?: boolean;
}

export interface Workshop {
  id: string;
  titleKey: string;
  descKey: string;
  level?: Level;
  duration: string;
}
