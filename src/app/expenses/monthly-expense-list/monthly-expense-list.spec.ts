import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpenseList } from './monthly-expense-list';

describe('MonthlyExpenseList', () => {
  let component: MonthlyExpenseList;
  let fixture: ComponentFixture<MonthlyExpenseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyExpenseList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyExpenseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
