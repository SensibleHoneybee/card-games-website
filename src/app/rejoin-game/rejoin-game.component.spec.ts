import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejoinGameComponent } from './rejoin-game.component';

describe('RejoinGameComponent', () => {
  let component: RejoinGameComponent;
  let fixture: ComponentFixture<RejoinGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejoinGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejoinGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
