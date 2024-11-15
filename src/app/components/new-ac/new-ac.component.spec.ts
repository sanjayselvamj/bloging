import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

import { NewACComponent } from './new-ac.component';

describe('NewACComponent', () => {
  let component: NewACComponent;
  let fixture: ComponentFixture<NewACComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NewACComponent, // Import the standalone component
        ReactiveFormsModule, // Import ReactiveFormsModule
        MatFormFieldModule, // Import Angular Material Form Field Module
        MatInputModule, // Import Angular Material Input Module
        CommonModule // Import CommonModule for *ngIf
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
