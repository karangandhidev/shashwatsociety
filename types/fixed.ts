import '@radix-ui/react-dialog'

declare module '@radix-ui/react-dialog' {
  export interface DialogPortalProps {
    className?: string
  }
}

import '@radix-ui/react-context-menu';

declare module '@radix-ui/react-context-menu' {
  export interface ContextMenuPortalProps {
    className?: string;
  }
}

import '@radix-ui/react-dropdown-menu';

declare module '@radix-ui/react-dropdown-menu' {
  export interface DropdownMenuPortalProps {
    className?: string;
  }
}

import '@radix-ui/react-popover';

declare module '@radix-ui/react-popover' {
  export interface PopoverPortalProps {
    className?: string;
  }
}

import '@radix-ui/react-tooltip';

declare module '@radix-ui/react-tooltip' {
  export interface TooltipPortalProps {
    className?: string;
  }
}