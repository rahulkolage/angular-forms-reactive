import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];

  signUpForm: FormGroup;
  forbideenUserNames = ["Chiris", "Anna"];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        userName: new FormControl(null, [Validators.required, this.forbideenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });

    // Form State, there are 2 observables, statusChanges and valueChanges
    this.signUpForm.valueChanges.subscribe((value)=>{
      console.log(value);
    });

    this.signUpForm.statusChanges.subscribe((value)=>{
      console.log(value);
    });

    // setValue
    this.signUpForm.setValue({
      'userData': {
        'userName': 'max',
        'email': 'max@gmail.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    // patchValue
    this.signUpForm.patchValue({
      'userData': {
        'userName': 'hello'
      }
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
    // this.signUpForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get("hobbies")).push(control);
  }

  getControls() {
    // (this.signupForm.get('hobbies') as FormArray).controls;
    return (<FormArray>this.signUpForm.get("hobbies")).controls;
  }

  forbideenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbideenUserNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }

    return null;
  }

  // Async validator
  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=>{
        if(control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
}
