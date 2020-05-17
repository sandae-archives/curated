import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../_services/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required, Validators.email],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.authenticationService.login(email, password).subscribe(() => {
      this.router.navigate(["list"]);
    });
  }
}
