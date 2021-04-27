import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-settings',
  templateUrl: './member-settings.component.html',
  styleUrls: ['./member-settings.component.css']
})
export class MemberSettingsComponent implements OnInit {
  @Output() cancelPasswordUpdate = new EventEmitter();
  member: Member;
  user: User;
  updatePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, 
    private memberService: MembersService, private toastr: ToastrService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.updatePasswordForm = this.fb.group({
      oldPassword : ['', Validators.required],
      newPassword : ['', [Validators.required, Validators.maxLength(30), Validators.minLength(8)]],
      confNewPassword : ['', [Validators.required, this.matchValues('newPassword')]],
      username : [this.user.username]
    })
    this.updatePasswordForm.controls.newPassword.valueChanges.subscribe(() => {
      this.updatePasswordForm.controls.confNewPassword.updateValueAndValidity();
    })
  }

  changePassword() {
    this.accountService.changePassword(this.updatePasswordForm.value).subscribe(response => {
      this.toastr.success("Password changed successfully");
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true}
    }
  }

  cancelPassUpdate() {
   this.cancelPasswordUpdate.emit(false);
  }

}
