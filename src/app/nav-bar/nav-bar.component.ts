import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isNavbarCollapsed = false;
  isMouseOverNavbar = false;

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.navbar-container') && !target.closest('.toggle-button')) {
      this.isNavbarCollapsed = true;
    }
  }

  // Adicione o manipulador de eventos para o mouse entrar na barra
  @HostListener('mouseenter', ['$event'])
  handleMouseEnter(event: Event): void {
    this.isNavbarCollapsed = false;
    this.isMouseOverNavbar = true;
  }

  // Adicione o manipulador de eventos para o mouse sair da barra
  @HostListener('mouseleave', ['$event'])
  handleMouseLeave(event: Event): void {
    if (!this.isMouseOverNavbar) {
      this.isNavbarCollapsed = true;
    }
    this.isMouseOverNavbar = false;
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
