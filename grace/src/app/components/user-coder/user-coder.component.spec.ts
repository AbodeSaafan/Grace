import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoderComponent } from './user-coder.component';

describe('UserCoderComponent', () => {
  let component: UserCoderComponent;
  let fixture: ComponentFixture<UserCoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
