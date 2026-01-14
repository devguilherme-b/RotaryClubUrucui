import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingOutMorePage } from './fing-out-more-page';

describe('FingOutMorePage', () => {
  let component: FingOutMorePage;
  let fixture: ComponentFixture<FingOutMorePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FingOutMorePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FingOutMorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
