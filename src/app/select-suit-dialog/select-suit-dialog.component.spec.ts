import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSuitDialogComponent } from './select-suit-dialog.component';

describe('SelectSuitDialogComponent', () => {
  let component: SelectSuitDialogComponent;
  let fixture: ComponentFixture<SelectSuitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSuitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSuitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
