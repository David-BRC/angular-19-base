import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

// A representative "smart-ish" presentational component:
//  - @Input / @Output  (codegen extracts these)
//  - inject()ed service with an observable  (codegen mocks the shape; users$ → BehaviorSubject)
//  - template uses *ngIf / *ngFor / async  (control-flow schematic migrates these to @if/@for)
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  @Input() title: any = 'Users';
  @Input() showRoles = true;
  @Output() selected = new EventEmitter<any>();

  private svc = inject(UserService);
  users$ = this.svc.users$;
  loading = false;

  ngOnInit(): void {
    this.svc.load();
  }

  pick(u: any): void {
    this.selected.emit(u);
  }
}
