class IdGenerator {
  private static LAST_ID = 0;

  private static GENERATE_ID = (prefix: string) => {
    const id = IdGenerator.LAST_ID + 1;
    IdGenerator.LAST_ID = id;
    return `${prefix}_${id}`;
  };

  readonly id: string;

  constructor(prefix: string) {
    this.id = IdGenerator.GENERATE_ID(prefix);
  }
}

export default IdGenerator;
