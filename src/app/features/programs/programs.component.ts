import { Component, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SeoService } from '../../core/seo/seo.service';

import { PROGRAMS, WORKSHOPS } from './programs.data';
import { Program, Level, Workshop } from './programs.model';

@Component({
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent {
  private seo = inject(SeoService);
  private translate = inject(TranslateService);

  programs = PROGRAMS;
  workshops: Workshop[] = WORKSHOPS;

  openId = signal<string | null>(null);
  activeLevels = signal<Record<string, Level | null>>({});

  constructor() {
    this.translate.get(['seo.programs.title', 'seo.programs.description']).subscribe((t) => {
      this.seo.setTitle(t['seo.programs.title']);
      this.seo.setDescription(t['seo.programs.description']);
    });
  }

  toggle(program: Program) {
    if (this.openId() === program.id) {
      this.openId.set(null);
      return;
    }

    this.openId.set(program.id);

    if (program.levels?.length) {
      this.activeLevels.update((m) => ({
        ...m,
        [program.id]: program.levels![0],
      }));
    }
  }

  selectLevel(programId: string, level: Level) {
    this.activeLevels.update((m) => ({
      ...m,
      [programId]: level,
    }));
  }

  getActiveLevel(programId: string) {
    return this.activeLevels()[programId] ?? null;
  }

  getLevelDescKey(program: Program): string | null {
    const level = this.getActiveLevel(program.id);
    if (!level || !program.levelDescKeys) return null;
    return program.levelDescKeys[level] ?? null;
  }
}
