import ready from 'document-ready';

import { HilbertGalleryViewer } from '../../library/ts/hilbert-gallery-viewer';

function zoom(zoomFactor: number, duration = 10) {
  const wrapper = document.querySelector('div.wrapper') as HTMLDivElement;
  wrapper.style.setProperty('--zoom-factor', `${zoomFactor}`);
  wrapper.style.setProperty('--transition-duration', `${duration}s`);
}

function pan(panTarget: { x: number; y: number }, duration = 10) {
  const wrapper = document.querySelector('div.wrapper') as HTMLDivElement;
  wrapper.style.setProperty('--pan-target-x', `${panTarget.x}`);
  wrapper.style.setProperty('--pan-target-y', `${panTarget.y}`);
  wrapper.style.setProperty('--transition-duration', `${duration}s`);
}

function zoomPan(
  zoomFactor: number,
  panTarget: { x: number; y: number },
  duration = 10,
) {
  zoom(zoomFactor, duration);
  pan(panTarget, duration);
}

const viewer = {
  zoom,
  pan,
  zoomPan,
};

Object.assign(window, { viewer });

function createActionButtons() {
  const buttonActions = [
    () => viewer.zoom(3),
    () => viewer.pan({ x: 0.3, y: 0.7 }),
    () => viewer.zoomPan(2, { x: 0.75, y: 0.25 }),
  ];
  const form = document.querySelector('form[id=actions]') as HTMLFormElement;
  buttonActions.forEach((buttonAction) => {
    const button = document.createElement('input');
    button.type = 'button';
    button.value = buttonAction
      .toString()
      .split(/(\r\n|\n|\r)/)
      .map((s) => s.trim())
      .join(' ');
    button.onclick = buttonAction;
    form.appendChild(button);
  });
}

async function main() {
  await new Promise<void>(ready);
  createActionButtons();

  console.log(HilbertGalleryViewer);

  const hGViewer = document.querySelector(
    'hilbert-gallery-viewer',
  ) as HilbertGalleryViewer;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  console.log(hGViewer.execute);
  hGViewer.execute('show', {
    mimetype: 'image/jpeg',
    url: 'https://placekitten.com/300/300',
    transition: {
      type: 'none',
    },
  });
}

function uncaughtErrorHandler(error: Error) {
  console.error('Uncaught error', error);
}

main().catch(uncaughtErrorHandler);
