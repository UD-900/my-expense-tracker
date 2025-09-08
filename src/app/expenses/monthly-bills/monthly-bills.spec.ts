import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBills } from './monthly-bills';

describe('MonthlyBills', () => {
  let component: MonthlyBills;
  let fixture: ComponentFixture<MonthlyBills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyBills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyBills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
