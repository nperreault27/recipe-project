export const getStarRating = (ratings: { string: number }) => {
  const total = Object.values(ratings).reduce((sum, rating) => sum + rating, 0);

  const numOfRatings = Object.values(ratings).length;
  return Math.round((total / (numOfRatings || 1)) * 2) / 2;
};
