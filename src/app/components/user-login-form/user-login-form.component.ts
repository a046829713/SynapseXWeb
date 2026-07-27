import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-user-login-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './user-login-form.component.html',
    styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent {
    private router = inject(Router);

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    onSubmit() {
        // TODO: 在此處處理表單提交邏輯
        console.log('Form Submitted!', this.loginForm.value);
        this.router.navigate(['/home']);
    }
}
