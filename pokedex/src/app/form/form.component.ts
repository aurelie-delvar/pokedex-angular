import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

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
      Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿ ]*$')
    ])
  });
  file: File | null = null;
  
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void { }
  
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }

  onUpload() {
    if (this.applyForm.valid) {
      if (this.file) {
        const formData = new FormData();

        formData.append("file", this.file, this.file.name);

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