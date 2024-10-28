// src/types/react-checkmark.d.ts

/* this file is created because react-checkmark 
 * doesn’t come with TypeScript type definitions, 
 * so errors keep on showing up. */

declare module 'react-checkmark' {
    import { FC } from 'react';
  
    interface CheckmarkProps {
      /** Size of the checkmark */
      size?: 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | string;
      /** Color of the checkmark */
      color?: string;
    }
  
    /** Checkmark component definition */
    export const Checkmark: FC<CheckmarkProps>;
  }
  