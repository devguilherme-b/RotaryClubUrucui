import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardOfDirectorsPage } from './board-of-directors-page';

describe('BoardOfDirectorsPage', () => {
  let component: BoardOfDirectorsPage;
  let fixture: ComponentFixture<BoardOfDirectorsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardOfDirectorsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardOfDirectorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
