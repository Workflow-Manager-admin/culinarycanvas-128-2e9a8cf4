/* eslint-disable no-undef, no-unused-vars */
/* global sessionStorage */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'cc-ingredient-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ingredient-input.component.html',
  styleUrl: './ingredient-input.component.css',
})
export class IngredientInputComponent {
  ingredients: string[] = [];
  ingredientText = '';
  focused: boolean = false;

  constructor(private router: Router) {}

  // PUBLIC_INTERFACE
  addIngredient() {
    const val = this.ingredientText.trim();
    if (val && !this.ingredients.includes(val.toLowerCase())) {
      this.ingredients.push(val.toLowerCase());
      this.ingredientText = '';
    }
  }

  // PUBLIC_INTERFACE
  removeIngredient(idx: number) {
    this.ingredients.splice(idx, 1);
  }

  // PUBLIC_INTERFACE
  next() {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('culinarycanvas_ingredients', JSON.stringify(this.ingredients));
    }
    this.router.navigate(['/generate']);
  }

  // PUBLIC_INTERFACE
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addIngredient();
    }
  }

  // PUBLIC_INTERFACE
  showHighlight(): boolean {
    return this.ingredients.length === 0;
  }
}
