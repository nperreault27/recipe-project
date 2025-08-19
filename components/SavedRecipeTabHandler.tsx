'use client'
export default function SavedRecipeTabHandler(){
  const origin = window.location.origin;
    window.location.href = `${origin}/saved-recipe`;
}