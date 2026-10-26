import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mini-bar-slide-indicator',
  standalone: true,
  template: `
    <span
      class="mini-bar-grabber"
      role="img"
      aria-label="Swipe up to expand, down to collapse"
    >
      <span class="mini-bar-grabber__chevron mini-bar-grabber__chevron--up" aria-hidden="true"></span>
      <span class="mini-bar-grabber__handle" aria-hidden="true"></span>
      <span class="mini-bar-grabber__chevron mini-bar-grabber__chevron--down" aria-hidden="true"></span>
    </span>
  `,
  styleUrl: './mini-bar-slide-indicator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniBarSlideIndicatorComponent {}
