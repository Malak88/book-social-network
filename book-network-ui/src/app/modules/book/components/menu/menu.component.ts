import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    ngOnInit(): void {
      const linkColor = document.querySelectorAll('.nav-link');

      // Add 'active' class to the link matching the current URL on page load
      linkColor.forEach(link => {
        if (window.location.href.endsWith(link.getAttribute('href') || '')) {
          link.classList.add('active');
        }
        // Add click event to update the 'active' class on link click
        link.addEventListener('click', () => {
          linkColor.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
