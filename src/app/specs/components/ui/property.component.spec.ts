import {PropertyComponent} from "../../../components/ui/property.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
describe('Property Component', () => {
  let comp: PropertyComponent;
  let fixture: ComponentFixture<PropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyComponent]
    });

    fixture = TestBed.createComponent(PropertyComponent);
    comp = fixture.componentInstance;
  });

  it('should show a given label and property', () => {
    comp.propertyLabel = 'Test Label';
    comp.propertyValue = 'Test Value';
    fixture.detectChanges();

    let labelDebugElement = fixture.debugElement.query(By.css('.propertyLabel'));
    let valueDebugElement = fixture.debugElement.query(By.css('.propertyValue'));

    let labelElement = labelDebugElement.nativeElement;
    let valueElement = valueDebugElement.nativeElement;

    const labelContent = labelElement.textContent;
    const valueContent = valueElement.textContent;

    expect(labelContent).toBe('Test Label:');
    expect(valueContent).toBe('Test Value');
  });

  it('should not show a label and property if the given value is empty', () => {
    comp.propertyLabel = "Test Label:";
    comp.propertyValue = '';
    fixture.detectChanges();

    let labelDebugElement = fixture.debugElement.query(By.css('.propertyLabel'));
    let valueDebugElement = fixture.debugElement.query(By.css('.propertyValue'));

    expect(labelDebugElement).not.toBeNull();
    expect(valueDebugElement).toBeNull();
  });
});
