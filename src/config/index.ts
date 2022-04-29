export type Recipe = {
  id: number;
  title: string;
  image: string;
};

export type GetRecipesResponse<T> = {
  recipes: T[];
};

export type GetResultsResponse<T> = {
  results: T[];
};
