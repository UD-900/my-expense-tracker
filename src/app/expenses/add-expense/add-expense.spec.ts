import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule, RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AddExpense } from "./add-expense";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { Router } from "@angular/router";
import { expenseService } from "../expense";

describe("AddExpense", () => {
    let component: AddExpense;
    let fixture: ComponentFixture<AddExpense>;
    let mockExpenseService: jasmine.SpyObj<expenseService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockExpenseService = jasmine.createSpyObj("expenseService", [
            "getCategories",
            "addCategory",
            "addExpense"
        ]);
        mockRouter = jasmine.createSpyObj("Router", ["navigate"]);

        mockExpenseService.getCategories.and.returnValue([
            { name: "Food" },
            { name: "Transport" }
        ]);

        await TestBed.configureTestingModule({
            declarations: [AddExpense],
            imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule],
            providers: [
                { provide: expenseService, useValue: mockExpenseService },
                { provide: Router, useValue: mockRouter },
                provideNativeDateAdapter(),
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AddExpense);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should initialize categories on ngOnInit", () => {
        component.ngOnInit();
        expect(component.categories.length).toBe(2);
        expect(component.categories[0].name).toBe("Food");
    });

    it("should add new category and expense on submit", () => {
        component.newCategoryName = "Health";
        component.newExpense = {
            id: "1",
            amount: 100,
            category: "",
            description: "Doctor visit",
            date: new Date()
        };
        component.onSubmit();
        expect(mockExpenseService.addCategory).toHaveBeenCalledWith("Health");
        expect(mockExpenseService.addExpense).toHaveBeenCalledWith(jasmine.objectContaining({
            amount: 100,
            category: "Health"
        }));
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/expenses/dashboard']);
    });

    it("should not add expense if form is incomplete", () => {
        spyOn(console, "log");
        component.newCategoryName = "";
        component.newExpense = {
            id: "2",
            amount: 0,
            category: "",
            description: "",
            date: null as any
        };
        component.onSubmit();
        expect(mockExpenseService.addExpense).not.toHaveBeenCalled();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith("Formulir tidak lengkap.");
    });
});
