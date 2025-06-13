/* eslint-disable no-undef, no-unused-vars */
/* global sessionStorage, fetch */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Cohere API constants -- in a real project, use .env/config!
const COHERE_API_URL = "https://api.cohere.ai/v1/generate";
const COHERE_MODEL = "command";
// WARNING: Insert your API KEY here for local dev, but do NOT expose publicly in demos!
const COHERE_API_KEY = "xyV9r163fmM8ieMhIFAUbmymr6DakgKJ8wj520lv"; // User must supply this!

@Component({
  selector: 'cc-ai-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-recipe.component.html',
  styleUrl: './ai-recipe.component.css'
})
export class AIRecipeComponent implements OnInit {
  ingredients: string[] = [];
  recipe: string | null = null;
  error: string | null = null;
  loading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const ing = sessionStorage.getItem('culinarycanvas_ingredients');
      if (!ing) {
        this.router.navigate(['/ingredients']);
        return;
      }
      this.ingredients = JSON.parse(ing);
      const previousRecipe = sessionStorage.getItem('culinarycanvas_recipe');
      if (previousRecipe) {
        this.recipe = previousRecipe;
      } else {
        this.generateRecipe();
      }
    }
  }

  // PUBLIC_INTERFACE
  async generateRecipe() {
    this.loading = true;
    this.error = null;
    this.recipe = null;

    try {
      if (typeof window !== 'undefined') {
        const resp = await fetch(COHERE_API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${COHERE_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: COHERE_MODEL,
            prompt: this.constructPrompt(),
            max_tokens: 600,
            temperature: 1,
            k: 0,
            stop_sequences: []
          })
        });

        if (!resp.ok) {
          throw new Error('Failed contacting AI: ' + resp.status);
        }
        const data = await resp.json();

        if (data.generations?.length) {
          this.recipe = data.generations[0].text.trim();
          sessionStorage.setItem('culinarycanvas_recipe', this.recipe ?? '');
        } else {
          this.error = "No recipe generated. Try again.";
        }
      }
    } catch (e: any) {
      this.error = e.message || 'Unknown error. Please check network or API key.';
      this.recipe = null;
    }
    this.loading = false;
  }

  // PUBLIC_INTERFACE
  constructPrompt(): string {
    return `
You are a creative, professional chef. Given these ingredients: ${this.ingredients.join(', ')}, create an original, detailed recipe using ONLY these items (with reasonable assumptions about pantry basics: oil, salt, pepper, water).

Recipe requirements:
- Invent a unique, appetizing dish idea.
- Give it a short, catchy name.
- Provide a full ingredient list—quantities and steps.
- Explain each step clearly, with tips.
- Describe how it should look, smell, and taste.
- Finish with serving and garnish suggestions.

Write in clear, encouraging language, but be very specific.

Recipe:
`.trim();
  }

  // PUBLIC_INTERFACE
  goBack() {
    this.router.navigate(['/ingredients']);
  }

  // PUBLIC_INTERFACE
  goToManage() {
    this.router.navigate(['/manage']);
  }
}
