import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NopageComponent } from './nopage-component';

describe('NopageComponent', () => {
  let component: NopageComponent;
  let fixture: ComponentFixture<NopageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NopageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NopageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
