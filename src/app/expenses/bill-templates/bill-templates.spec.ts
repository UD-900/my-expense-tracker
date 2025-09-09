import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { BillTemplates } from "./bill-templates";

describe("BillTemplates", () => {
    let component: BillTemplates;
    let fixture: ComponentFixture<BillTemplates>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BillTemplates],
            imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule],
            providers: [
                provideNativeDateAdapter(),
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BillTemplates);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

});
