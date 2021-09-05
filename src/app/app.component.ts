import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'reactive';
  genders = ['male', 'female'];
  signupForm!: FormGroup;
  forbiddenFirstnames = ['Chris', 'Anna'];
  submitted!: boolean;
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(){

    this.signupForm = new FormGroup({
      'firstname': new FormControl('', [Validators.required, this.forbiddenNames.bind(this)]),
      'lastname': new FormControl(''),
      'username': new FormControl('',Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'mobilenumber': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      //'confirmpassword': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'gender': new FormControl('female'),
      'hobbies': new FormArray ([])
    });

      // this.signupForm=this.formBuilder.group({
      //   'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      //   'confirmpassword': new FormControl('', Validators.required)
      // },{
      //   validator: MustMatch('password', 'confirmpassword')
      
      // });
      
       
  
  }
  onSubmit(){
    //this.submitted=true;
    console.log(this.signupForm);
    if(this.signupForm.invalid){
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signupForm.value))
  }
  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }
  
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
if(this.forbiddenFirstnames.indexOf(control.value)!== -1){
  return{'nameIsForbidden': true};
}
return null as any;
  }
}

