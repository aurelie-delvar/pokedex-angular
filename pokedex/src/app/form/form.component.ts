import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  applyForm = new FormGroup({
    pokemonName: new FormControl(''),
    authorName: new FormControl('')
  });
  file: File | null = null;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void { }
  
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();

      formData.append("file", this.file, this.file.name);

      const upload$ = this.http.post("https://httpbin.org/post", formData);

      upload$.subscribe({
        error: (error: any) => {
          return throwError(() => error);
        }
      })
    }
  }
}
