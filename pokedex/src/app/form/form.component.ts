import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  applyForm = new FormGroup({
    pokemonName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    authorName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("^[a-zA-ZàâéèêëîùçÀÉÈÊ'-\s]+$")
    ]),
    fileUpload: new FormControl('', [
      Validators.required
    ])
  });
  file: File | null = null;
  errorMessage: string | null = null;
  secureHtmlContent: SafeHtml | null = null;
  
  constructor(private http: HttpClient, private router: Router, private sanitizer: DomSanitizer) { 
    const pokemonName = this.applyForm.get('pokemonName')?.value;
    const authorName = this.applyForm.get('authorName')?.value;
    const file = this.file;
    const potentiallyUnsafeHtml = `${pokemonName} ${authorName} ${file?.name}`;
    this.sanitizer.bypassSecurityTrustHtml(potentiallyUnsafeHtml);
  }

  ngOnInit(): void { }

  sanitizeInput(input: string): string {
    return input.replace(/[^a-zA-Z0-9 ]/g, '');
  }
  
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }

    const allowedTpes = ['image/png', 'image/jpeg', 'image/jpg'];
    if(!allowedTpes.includes(file.type)) {
      this.file = null;
      this.errorMessage = 'Invalid file type. Please upload a valid image file.';
      return;
    }

    this.errorMessage = null;
  }

  onUpload() {
    if (this.applyForm.valid) {

      const sanitizedData = {
        pokemonName: this.sanitizeInput(this.applyForm.value.pokemonName || ''),
        authorName: this.sanitizeInput(this.applyForm.value.authorName || '')
      };      

      if (this.file) {
        const formData = new FormData();

        const sanitizedFileName = this.sanitizeInput(this.file.name);

        formData.append("file", this.file, sanitizedFileName);

        const upload$ = this.http.post("https://httpbin.org/post", formData);

        upload$.pipe(
          catchError((error: any) => {
            return throwError(() => error);
          })
        ).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            console.error('Upload failed', error);
          }
        });
      }
    }
  }
}