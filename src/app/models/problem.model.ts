export class Problem {
  public name: string;
  public statement: string;
  public tags: string[];

  constructor() {
    this.name = 'My problem';
    this.statement = `
    You can write text, that contains expressions like this: $x ^ 2 + 5$ inside them. As you probably know.
    You also can write expressions in display mode as follows: $$\\sum_{i=1}^n(x_i^2 - \\overline{x}^2)$$.
    In first case you will need to use \\$expression\\$ and in the second one \\$\\$expression\\$\\$.
    To escape the \\$ symbol it's mandatory to write as follows: \\\\$
    `;
    this.tags = ['Binary search'];
  }
}
