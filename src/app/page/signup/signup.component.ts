import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-signup',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
    form!: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: new FormControl(),
            password: new FormControl(),
            passwordConfirm: new FormControl(),
            firstName: new FormControl(),
            lastName: new FormControl(),
        })
    }

    signup() {
        const info = this.form.getRawValue()
        this.authService.signup(info)
            .then(_ => this.router.navigate(["/login"]))
    }

    login() { this.router.navigate(["/login"]); }


}
