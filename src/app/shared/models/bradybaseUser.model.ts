import * as _ from 'lodash';
import * as firebase from 'firebase/app';

export class BradybaseUser {
  public createdAt: string;
  public email: string;
  public lastActive: string;
  public name: string;
  public photoURL: string;
  public uid: string;


  constructor(data: {
    email: string,
    name: string,
    photoURL: string,
    uid?: string
  }) {
    _.assign(this, data);
  }

  save() {
    const serialized = JSON.parse(JSON.stringify(_.omit(this,
      ['uid', 'createdAt', 'lastActive'])));
    if (!this.createdAt) {
      serialized.createdAt = firebase.database.ServerValue.TIMESTAMP;
    }
    return serialized;
  }
}
