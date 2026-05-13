import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsByAudits } from './assets-by-audits';

describe('AssetsByAudits', () => {
  let component: AssetsByAudits;
  let fixture: ComponentFixture<AssetsByAudits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsByAudits],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetsByAudits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
