import {ProblemType, Season} from '../../core/constants';

export interface ProblemRecord {
  course: string;
  median?: number;
  problemNumber?: number;
  quarter: Season;
  type?: ProblemType;
  typeNumber?: number;
  year: number;
}
