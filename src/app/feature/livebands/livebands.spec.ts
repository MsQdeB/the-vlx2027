import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivebandsComponent } from './livebands';

describe('LivebandsComponent', () => {
  let component: LivebandsComponent;
  let fixture: ComponentFixture<LivebandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivebandsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LivebandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
