type Types = typeof Tracker.TYPES[number];

type Value = {
  string: string | undefined;
  image: string | undefined;
};

class Tracker<T extends Types = Types> {
  static TYPES = ['string', 'image'] as const;

  constructor(
    public name: string,
    public type: T,
    public value: Value[T],
  ) {
  }
}

export default Tracker;

export const safeTrackerCreation = (tracker: Partial<Tracker>): Tracker => {
  if (!tracker.name) throw new Error('EMPTY_NAME');
  if (!/^[A-z]+$/.test(tracker.name)) throw new Error('INCORRECT_NAME');
  if (!tracker.type) throw new Error('EMPTY_TYPE');

  return new Tracker(tracker.name, tracker.type, tracker.value);
};
