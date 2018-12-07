import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClientService } from 'src/app/core/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { genderOptions } from 'src/app/shared/models/gender.enum';
import { phoneNumberMask } from '../../util/mask.util';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  submitted: Boolean = false;
  options = genderOptions;
  phonemask = phoneNumberMask;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clientForm.addControl('clientId', new FormControl(''));
        this.clientService.getById(id)
          .subscribe(client => {
            this.clientForm.setValue({
              clientId: client.clientId,
              firstName: client.firstName,
              lastName: client.lastName,
              email: client.email,
              phone: client.phone,
              gender: client.gender
            });
          }, erro => console.log(erro));
      }
    });
  }

  get f() { return this.clientForm.controls; }

  getErrorMessageForFirstNameField() {
    return this.f.firstName.hasError('required') ? 'Campo obrigatório' : '';
  }

  getErrorMessageForLastNameField() {
    return this.f.lastName.hasError('required') ? 'Campo obrigatório' : '';
  }

  getErrorMessageForEmailField() {
    return this.f.email.hasError('required') ? 'Campo obrigatório' :
      this.f.email.hasError('email') ? 'E-mail invalido' :
        '';
  }

  getErrorMessageForPhoneField() {
    return this.f.phone.hasError('required') ? 'Campo obrigatório' : '';
  }

  getErrorMessageForGenderField() {
    return this.f.gender.hasError('required') ? 'Campo obrigatório' : '';
  }

  onSubmit() {
    this.submitted = true;

    if (this.clientForm.invalid) {
      return;
    }
    this.clientService.addOrUpdate(this.clientForm.value)
      .subscribe(data => {
        this.router.navigate(['client']);
      });
  }
}
