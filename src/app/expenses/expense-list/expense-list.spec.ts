import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExpenseList } from './expense-list';
import { expenseService } from '../expense';

describe('ExpenseList', () => {
    let component: ExpenseList;
    let fixture: ComponentFixture<ExpenseList>;
    let mockActivatedRoute: any;
    let mockExpenseService: jasmine.SpyObj<expenseService>;

    // Inside your beforeEach block
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExpenseList],
            imports: [CommonModule, RouterModule.forRoot([])],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide the mock
            ]
        }).compileComponents();
    });

    beforeEach(() => {

        mockExpenseService = jasmine.createSpyObj("expenseService", [
            "getExpenses"
        ]);

        mockExpenseService.getExpenses.and.returnValue([
            { id: "1", amount: 50000, category: "makanan", description: "makan siang", date: new Date() }
        ])

        fixture = TestBed.createComponent(ExpenseList);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Triggers ngOnInit
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

});