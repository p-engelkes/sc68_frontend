import {EditUserProfileComponent} from "../../../components/user/edit.user.profile.component";
import {ComponentFixture, async, TestBed} from "@angular/core/testing";
import {EditInputFieldComponent} from "../../../components/ui/edit.input.field.component";
import {FakeUserService, FakeDataService, FakeTeamService, FakeRouter, queryElement} from "../spec.utils";
import {UserService} from "../../../services/user.service";
import {DataService} from "../../../services/data.service";
import {TeamService} from "../../../services/team.service";
import {Router} from "@angular/router";
import {By} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {NgUploaderModule} from "ngx-uploader";
describe('Edit User Profile Component', () => {
  let component: EditUserProfileComponent;
  let fixture: ComponentFixture<EditUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserProfileComponent, EditInputFieldComponent],
      imports: [ReactiveFormsModule, NgUploaderModule],
      providers: [
        {provide: UserService, useClass: FakeUserService},
        {provide: DataService, useClass: FakeDataService},
        {provide: TeamService, useClass: FakeTeamService},
        {provide: Router, useClass: FakeRouter},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should have 4 edit-input-fields', () => {
    fixture.detectChanges();

    let editInputFieldDebugElements = fixture.debugElement.queryAll(By.css('edit-input-field'));
    expect(editInputFieldDebugElements.length).toBe(4);
  });

  it('should have 2 select options', () => {
    fixture.detectChanges();

    let editInputFieldDebugElements = fixture.debugElement.queryAll(By.css('select'));
    expect(editInputFieldDebugElements.length).toBe(2);
  });

  it('should have 1 file field', () => {
    fixture.detectChanges();

    let fileFieldDebugElement = queryElement('.file-field', fixture);
    expect(fileFieldDebugElement).not.toBeNull();
  });

  it('should have a refresh button', () => {

  })
});
