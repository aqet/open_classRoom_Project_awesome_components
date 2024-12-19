import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { CandidatesService } from '../../services/candidates.service';
import { Candidate } from '../../models/candidate.model';
import { MatCard, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatNavList } from '@angular/material/list';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatLine, MatOption } from '@angular/material/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CandidateSearchType } from '../../enums/candidate-search-type.enum';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitleGroup,
    MatCardTitle,
    MatSpinner,
    MatNavList,
    NgFor,
    NgIf,
    AsyncPipe,
    RouterLink,
    MatLine,
    MatFormField,
    MatIcon,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatInput,
    MatSuffix
  ],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
  }[];

  constructor(private candidatesService: CandidatesService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm()
    this.initObservables();
    this.candidatesService.getCandidatesFromServer()
  }
  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
      { value: CandidateSearchType.LASTNAME, label: 'Nom' },
      { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
      { value: CandidateSearchType.COMPANY, label: 'Entreprise' }
  ];
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
        startWith(this.searchTypeCtrl.value)
    );
    this.candidates$ = combineLatest([
      search$,
      searchType$,
      this.candidatesService.candidates$
      ]
    ).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
          .toLowerCase()
          .includes(search as string))
      )
    );
  }

}
