import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitanDashboard } from './capitan-dashboard';

describe('CapitanDashboard', () => {
  let component: CapitanDashboard;
  let fixture: ComponentFixture<CapitanDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapitanDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapitanDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
