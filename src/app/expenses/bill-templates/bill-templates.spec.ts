import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTemplates } from './bill-templates';

describe('BillTemplates', () => {
  let component: BillTemplates;
  let fixture: ComponentFixture<BillTemplates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillTemplates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillTemplates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
