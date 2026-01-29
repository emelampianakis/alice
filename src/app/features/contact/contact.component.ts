import { Component, inject, computed, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SeoService } from '../../core/seo/seo.service';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  private seo = inject(SeoService);
  private translate = inject(TranslateService);
  private fb = inject(FormBuilder);
  private langSvc = inject(LanguageService);
  private route = inject(ActivatedRoute);

  lang = computed(() => this.langSvc.lang());

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  constructor() {
    this.translate.get(['seo.contact.title', 'seo.contact.description']).subscribe((t) => {
      this.seo.setTitle(t['seo.contact.title']);
      this.seo.setDescription(t['seo.contact.description']);
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.program = params.get('program') ?? undefined;
      this.level = params.get('level') ?? undefined;

      if (this.program) {
        const message = `I would like to book ${this.program}${
          this.level ? ' (' + this.level + ')' : ''
        }.`;

        this.form.patchValue({ message });
      }
    });
  }

  program?: string;
  level?: string;

  submit() {
    if (this.form.invalid) return;

    // Placeholder: later connect to backend / email service
    console.log('Contact form', this.form.value);

    this.form.reset();
    alert('Message sent (placeholder)');
  }
}
