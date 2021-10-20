import * as React from 'react';

/**
 * Execute a callback function when the component is mounted.
 *
 * @param callback Callback function to execute.
 */
export function useOnMount(callback: (...args: unknown[]) => unknown): void {
  const isFirstUpdate = React.useRef(true);

  React.useLayoutEffect(() => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
      callback();
    }
  });
}
