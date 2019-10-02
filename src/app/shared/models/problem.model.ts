import * as _ from 'lodash';
import * as firebase from 'firebase/app';
import {ProblemRecord} from '../interfaces/problemRecord.interface';

export class Problem {
  public createdAt: number;
  public createdBy: string;
  public name: string;
  public lastUpdated: string;
  public records: ProblemRecord[];
  public statement: string;
  public tags: string[];
  public uid: string;
  public updatedBy: string;

  constructor(data?: any) {
    this.name = 'My problems';
    this.statement = `
    You can write text, that contains expressions like this: $x ^ 2 + 5$ inside them. As you probably know.
    You also can write expressions in display mode as follows: $$\\sum_{i=1}^n(x_i^2 - \\overline{x}^2)$$.
    In first case you will need to use \\$expression\\$ and in the second one \\$\\$expression\\$\\$.
    To escape the \\$ symbol it's mandatory to write as follows: \\\\$
    `;
    this.tags = ['Binary search'];
    _.assign(this, data);
  }

  save() {
    const serialized = JSON.parse(JSON.stringify(_.omit(this,
      ['uid', 'createdAt'])));
    if (!this.createdAt) {
      serialized.createdAt = firebase.database.ServerValue.TIMESTAMP;
    }
    serialized.lastUpdated = firebase.database.ServerValue.TIMESTAMP;
    return serialized;
  }
}
