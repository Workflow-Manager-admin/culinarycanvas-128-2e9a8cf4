/* eslint-disable no-undef, no-unused-vars */
/* global sessionStorage */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cc-recipe-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-manage.component.html',
  styleUrl: './recipe-manage.component.css'
})
export class RecipeManageComponent implements OnInit {
  recipe: string | null = null;
  hasRecipe: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.recipe = sessionStorage.getItem('culinarycanvas_recipe');
      this.hasRecipe = !!this.recipe;
    }
  }

  // PUBLIC_INTERFACE
  deleteRecipe() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('culinarycanvas_recipe');
      sessionStorage.removeItem('culinarycanvas_ingredients');
    }
    this.recipe = null;
    this.hasRecipe = false;
  }

  // PUBLIC_INTERFACE
  goToInput() {
    this.router.navigate(['/ingredients']);
  }
}
