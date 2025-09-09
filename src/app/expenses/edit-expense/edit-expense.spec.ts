import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { EditExpense } from "./edit-expense";
import { ActivatedRoute } from "@angular/router";
import { expenseService } from "../expense";

describe("EditExpense", () => {
    let component: EditExpense;
    let fixture: ComponentFixture<EditExpense>;
    let mockActivatedRoute: any = {
        snapshot: {
            paramMap: {
                get: (key: string) => "test-id"
            }
        }
    };
    let mockExpenseService: jasmine.SpyObj<expenseService>;
    let mockEditExpense: jasmine.SpyObj<EditExpense>;

    beforeEach(async () => {
        mockExpenseService = jasmine.createSpyObj("expenseService", [
            "getCategories",
            "addCategory",
            "addExpense",
            "getExpenseById"
        ]);
        mockEditExpense = jasmine.createSpyObj("EditExpense", [
            "getExpenseToEdit"
        ]);

        mockExpenseService.getCategories.and.returnValue([
            { name: "Food" },
            { name: "Transport" }
        ]);

        await TestBed.configureTestingModule({
            declarations: [EditExpense],
            imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule],
            providers: [
                provideNativeDateAdapter(),
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(EditExpense);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

});
