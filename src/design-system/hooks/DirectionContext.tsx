/**
 * DirectionContext — Cretiq Design System
 * 
 * Provides language direction (RTL/LTR) across the app.
 * Primitives that render directional elements (arrows, icons, layouts)
 * should consume this via `useDirection()`.
 */

import { createContext, useContext, type ReactNode } from 'react';

export type Direction = 'rtl' | 'ltr';
export type Language = 'fa' | 'en';

interface DirectionContextValue {
  direction: Direction;
  language: Language;
}

const DirectionContext = createContext<DirectionContextValue>({
  direction: 'rtl',
  language: 'fa',
});

export function DirectionProvider({
  children,
  direction = 'rtl',
  language = 'fa',
}: {
  children: ReactNode;
  direction?: Direction;
  language?: Language;
}) {
  return (
    <DirectionContext.Provider value={{ direction, language }}>
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  return useContext(DirectionContext);
}
