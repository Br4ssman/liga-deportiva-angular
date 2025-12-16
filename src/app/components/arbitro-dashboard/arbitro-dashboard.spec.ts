import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitroDashboard } from './arbitro-dashboard';

describe('ArbitroDashboard', () => {
  let component: ArbitroDashboard;
  let fixture: ComponentFixture<ArbitroDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitroDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbitroDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
