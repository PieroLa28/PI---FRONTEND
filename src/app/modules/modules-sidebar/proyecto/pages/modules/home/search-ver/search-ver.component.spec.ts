import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVerComponent } from './search-ver.component';

describe('SearchVerComponent', () => {
  let component: SearchVerComponent;
  let fixture: ComponentFixture<SearchVerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchVerComponent]
    });
    fixture = TestBed.createComponent(SearchVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
