import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdataComponent } from './helpdata.component';

describe('HelpdataComponent', () => {
  let component: HelpdataComponent;
  let fixture: ComponentFixture<HelpdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
