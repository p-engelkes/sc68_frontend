import {EditInputFieldComponent} from "../../../components/ui/input_fields/edit_input_field/edit.input.field.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
describe('Edit Input Field Component Can Not Be Tested In A Standalone Context', () => {
  let comp: EditInputFieldComponent;
  let fixture: ComponentFixture<EditInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditInputFieldComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInputFieldComponent);
    comp = fixture.componentInstance;
  });
});
