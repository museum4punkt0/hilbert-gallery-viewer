import cssText from 'bundle-text:../../scss/transition/none.scss';

import CssBasedTransition, { CssBasedTransitionOptions } from './css-based';
import { TransitionOptions, TransitionStatic } from './transition';
import { staticImplements } from '../util/types';
import { setCSSPropertyIfDefined } from '../util/style';

type NoneTransitionOptions = TransitionOptions;

@staticImplements<TransitionStatic<NoneTransition, NoneTransitionOptions>>()
export default class NoneTransition extends CssBasedTransition {
  constructor(element: HTMLElement, options: NoneTransitionOptions) {
    super(element, NoneTransition.createCssBasedTransitionOptions(options));
  }

  static createCssBasedTransitionOptions(
    options: NoneTransitionOptions,
  ): CssBasedTransitionOptions {
    const animationEventFilter = ({ animationName }: AnimationEvent) =>
      animationName === 'transition-none';

    const cssPropertySetter = (e: HTMLElement) => {
      const { delay, duration } = options;
      const s = setCSSPropertyIfDefined;
      s(e, '--transition-none-delay', (v) => `${v}s`, delay);
      s(e, '--transition-none-duration', (v) => `${v}s`, duration);
    };

    const cssPropertyRemover = (e: HTMLElement) => {
      const propertyNames = [
        '--transition-none-delay',
        '--transition-none-duration',
      ];
      propertyNames.forEach((n) => e.style.removeProperty(n));
    };

    return {
      classList: ['transition', 'transition-none'],
      endEventFilter: animationEventFilter,
      cancelEventFilter: animationEventFilter,
      cssPropertySetter,
      cssPropertyRemover,
      removeAtEnd: true,
      removeOnCancel: true,
    };
  }

  static unpack(options: unknown): NoneTransitionOptions {
    return options as NoneTransitionOptions;
  }

  static prepare(options: unknown): (element: HTMLElement) => NoneTransition {
    const unpackedOptions = NoneTransition.unpack(options);
    return (element: HTMLElement) =>
      new NoneTransition(element, unpackedOptions);
  }

  static getStyleSheetAsString(): string {
    return cssText;
  }
}

export { NoneTransition };
