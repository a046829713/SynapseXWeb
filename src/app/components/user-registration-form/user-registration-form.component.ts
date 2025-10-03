import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

// 自訂驗證器：檢查密碼和確認密碼是否相符
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    // 如果不匹配，在 confirmPassword 欄位上設定一個錯誤
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    // 如果匹配，且 confirmPassword 之前有 mismatch 錯誤，則清除它
    if (confirmPassword?.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
    return null;
  }
}

@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent {
  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator }); // 在 FormGroup 層級套用自訂驗證器

  onSubmit() {
    if (this.registrationForm.valid) {
      // TODO: 在此處處理表單提交邏輯，例如呼叫後端 API
      console.log('Form Submitted!', this.registrationForm.value);
    } else {
      // 如果表單無效，標記所有欄位為 touched 以顯示錯誤訊息
      this.registrationForm.markAllAsTouched();
    }
  }
}
