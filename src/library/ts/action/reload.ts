import { Base } from './base';
import { State } from '../util/types';

export default class ReloadAction extends Base<void, void> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(state: State) {
    super(state);
  }

  // eslint-disable-next-line class-methods-use-this
  execute(): void {
    window.location.reload();
  }

  // eslint-disable-next-line class-methods-use-this
  unpack(): void {}
}

export { ReloadAction };