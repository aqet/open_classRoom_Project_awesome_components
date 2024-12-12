import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent {

}
