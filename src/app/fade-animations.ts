import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/animations';

export let fadeAnimation = trigger('fade', [
    state('void',
      style({ backgroundColor: 'yellow', opacity: 0 }),
    ),
    transition(':enter', [
      style({ backgroundColor: 'green', opacity: 0 }),
      animate(2000, style ({ backgroundColor: 'white', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ backgroundColor: 'red', opacity: 0 }),
      animate(2000, style ({ backgroundColor: 'white', opacity: 1 }))
    ])
  ]);
