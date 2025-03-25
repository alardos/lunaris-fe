import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    form!: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: new FormControl(),
            password: new FormControl(),
        })
    }

    login() {
        const cred = this.form.getRawValue()
        this.authService.login(cred.email,cred.password)
            .then(_ => this.router.navigate(["/home"]))
    }



}
