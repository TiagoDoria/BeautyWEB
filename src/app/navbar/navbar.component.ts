import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const navbar = document.getElementById('mainNav');
        if (navbar) { // Verifica se navbar não é nulo
          if (window.scrollY > 100) {
            navbar.classList.remove('hidden');
          } else {
            navbar.classList.add('hidden');
          }
        }
      });
    }
  }
}
