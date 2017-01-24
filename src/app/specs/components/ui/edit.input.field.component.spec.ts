import {EditInputFieldComponent} from "../../../components/ui/edit.input.field.component";
import {ComponentFixture, TestBed, async} from "@angular/core/testing";
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
