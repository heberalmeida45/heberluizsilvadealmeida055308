import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { TutorFormComponent } from './tutor-form'; //
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TutorFormComponent', () => {
  let component: TutorFormComponent;
  let fixture: ComponentFixture<TutorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({     
      imports: [
        TutorFormComponent, 
        ReactiveFormsModule, 
        HttpClientTestingModule, 
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } }, 
            params: of({ id: '1' })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorFormComponent);
=======

import { TutorForm } from './tutor-form';

describe('TutorForm', () => {
  let component: TutorForm;
  let fixture: ComponentFixture<TutorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorForm);
>>>>>>> deb8838b68351c5a7ca028964bc7cd557a5cc154
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> deb8838b68351c5a7ca028964bc7cd557a5cc154
