import cssText from 'bundle-text:../../scss/transition/fade.scss';

import { JSONSchemaType } from 'ajv';

import CssBasedTransition, { CssBasedTransitionOptions } from './css-based';
import { TransitionOptions, TransitionStatic } from './transition';
import { staticImplements } from '../util/types';
import { setCSSPropertyIfDefined } from '../util/style';
import { ajvCompile } from '../util/validate';

interface FadeTransitionOptions extends TransitionOptions {
  color?: string;
}

// TODO: avoid JSONSchemaType cast; needs at least Ajv v9 to support optional properties
const fadeTransitionOptionsSchema = {
  type: 'object',
  properties: {
    delay: { type: 'number', minimum: 0 },
    duration: { type: 'number', minimum: 0 },
    color: { type: 'string' },
  },
} as JSONSchemaType<FadeTransitionOptions>;

const validateFadeTransitionOptions = ajvCompile(fadeTransitionOptionsSchema);

// overwrites the (invalid) value set as default in the SCSS file
const defaultDuration = 2;

@staticImplements<TransitionStatic<FadeTransition, FadeTransitionOptions>>()
export default class FadeTransition extends CssBasedTransition {
  constructor(element: HTMLElement, options: FadeTransitionOptions) {
    super(element, FadeTransition.createCssBasedTransitionOptions(options));
  }

  static createCssBasedTransitionOptions(
    options: FadeTransitionOptions,
  ): CssBasedTransitionOptions {
    const outAnimationEventFilter = ({ animationName }: AnimationEvent) =>
      animationName === 'transition-fade-overlay';
    const animationEventFilter = ({ animationName }: AnimationEvent) =>
      animationName === 'transition-fade';
    const { delay, duration, color } = {
      duration: defaultDuration,
      ...options,
    };

    const cssPropertySetter = (e: HTMLElement) => {
      const s = setCSSPropertyIfDefined;
      s(e, '--transition-fade-delay', (v) => `${v}s`, delay);
      s(e, '--transition-fade-duration', (v) => `${v}s`, duration);
      s(e, '--transition-fade-color', (v) => `${v}`, color);
    };

    const cssPropertyRemover = (e: HTMLElement) => {
      const propertyNames = [
        '--transition-fade-delay',
        '--transition-fade-duration',
        '--transition-fade-color',
      ];
      propertyNames.forEach((n) => e.style.removeProperty(n));
    };

    return {
      classList: ['transition', 'transition-fade'],
      outEndEventFilter: outAnimationEventFilter,
      endEventFilter: animationEventFilter,
      cancelEventFilter: animationEventFilter,
      cssPropertySetter,
      cssPropertyRemover,
      removeAtEnd: true,
      removeOnCancel: true,
      targetShowUpDelay: (delay ?? 0) + duration / 2,
    };
  }

  static unpack(options: unknown): FadeTransitionOptions {
    return validateFadeTransitionOptions(options);
  }

  static prepare(options: unknown): (element: HTMLElement) => FadeTransition {
    const unpackedOptions = FadeTransition.unpack(options);
    return (element: HTMLElement) =>
      new FadeTransition(element, unpackedOptions);
  }

  static getStyleSheetAsString(): string {
    return cssText;
  }
}

export { FadeTransition, FadeTransitionOptions };
