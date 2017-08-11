export const STATES = {
  'new': 'new',
  'current': 'current',
  'finished': 'finished'
};

export interface IEvent {
  title: string;
  state: string;
  productIds: string[];
  startedAt?: Date;
  finishedAt?: Date;
  id?: string;
}

export class Event implements IEvent {
  title: string;
  state: string = STATES.new;
  productIds: string[] = [];
  startedAt: Date;
  finishedAt: Date;
  id: string;
  constructor(data?: IEvent) {
    Object.assign(this, data);
  }
}
