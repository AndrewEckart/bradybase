
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase, ChildEvent, QueryFn, SnapshotAction} from '@angular/fire/database';
import {BBConstructor} from '../../../shared/interfaces/bbConstructor.interface';

@Injectable()
export class DatabaseService {

  static mapSnapshotToObject<T>(action: SnapshotAction<T>, constructor: BBConstructor<T>): T {
    if (!action.payload.exists()) {
      return null;
    }
    const val: T = action.payload.val();
    return new constructor(Object.assign({uid: action.payload.key}, val));
  }

  static mapSnapshotActionsToObjects<T>(actions: SnapshotAction<T>[], constructor: BBConstructor<T>): T[] {
    return actions.map((action: SnapshotAction<T>) => DatabaseService.mapSnapshotToObject<T>(action, constructor));
  }

  constructor(private db: AngularFireDatabase) {
  }

  list<T>(path: string, constructor: BBConstructor<T>, queryFn?: QueryFn, events?: ChildEvent[]): Observable<T[]> {
    const list = queryFn ? this.db.list(path, queryFn) : this.db.list(path);
    const obs = !!events ? list.snapshotChanges(events) : list.snapshotChanges();
    return obs.pipe(
      map((changes: SnapshotAction<T>[]) => DatabaseService.mapSnapshotActionsToObjects(changes, constructor)));
  }

  object<T>(path: string, constructor: BBConstructor<T>): Observable<T> {
    return this.db.object(path)
      .snapshotChanges().pipe(
        map((action: SnapshotAction<T>) => DatabaseService.mapSnapshotToObject(action, constructor)));
  }

  set(path: string, value: any) {
    this.db.object(path).set(value)
      .catch((error) => {
        console.error(error);
      });
  }

  update(path: string, data: any) {
    return this.db.object(path).update(data);
  }

  push(path: string, value: any) {
    return this.db.list(path).push(value);
  }

}
