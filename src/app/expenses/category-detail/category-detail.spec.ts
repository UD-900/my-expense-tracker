import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CategoryDetail } from './category-detail';
import { CommonModule } from '@angular/common';

describe('CategoryDetail', () => {
    let component: CategoryDetail;
    let fixture: ComponentFixture<CategoryDetail>;
    let mockActivatedRoute: any;

    // Create a mock ActivatedRoute object
    mockActivatedRoute = {
        paramMap: of({ get: () => 'some-id' }), // Mock the paramMap observable
    };

    // Inside your beforeEach block
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryDetail],
            imports: [CommonModule],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide the mock
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryDetail);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Triggers ngOnInit
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

});