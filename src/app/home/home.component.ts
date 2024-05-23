import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {
  ngOnInit(): void {
    this.initTypewriter();
  }

  initTypewriter() {
    if (typeof document !== 'undefined') {
      class TxtType {
        toRotate: string[];
        el: HTMLElement;
        loopNum: number;
        period: number;
        txt: string;
        isDeleting: boolean;

        constructor(el: HTMLElement, toRotate: string[], period: string) {
          this.toRotate = toRotate;
          this.el = el;
          this.loopNum = 0;
          this.period = parseInt(period, 10) || 2000;
          this.txt = '';
          this.isDeleting = false;
          this.tick();
        }

        tick() {
          const i = this.loopNum % this.toRotate.length;
          const fullTxt = this.toRotate[i];

          if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
          } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
          }

          this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

          let delta = 200 - Math.random() * 100;

          if (this.isDeleting) {
            delta /= 2;
          }

          if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
          } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
          }

          setTimeout(() => this.tick(), delta);
        }
      }

      const elements = document.getElementsByClassName('typewrite');
      for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-type');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(
            elements[i] as HTMLElement,
            JSON.parse(toRotate) as string[],
            period || '2000'  // Default to 2000 if period is null
          );
        }
      }

      // INJECT CSS
      const css = document.createElement('style');
      css.type = 'text/css';
      css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid transparent}';
      document.body.appendChild(css);
    }
  }
}
