import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

// Deliberately loose types ("mostly any") to mirror the real codebase the
// toolkit targets — the codegen has to work from structure + recorded data,
// not from types.
@Injectable({ providedIn: 'root' })
export class UserService {
  readonly users$ = new BehaviorSubject<any>([]);

  load(): void {
    // pretend HTTP — in the toolkit this response is what gets *recorded* as a fixture
    this.users$.next([
      { id: 1, name: 'Ada Lovelace', role: 'admin' },
      { id: 2, name: 'Alan Turing', role: 'user' },
    ]);
  }

  getById(id: any) {
    return of((this.users$.value as any[]).find((u) => u.id === id) ?? null);
  }
}
