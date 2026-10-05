import { api } from './client';

export interface SearchMovie {
	id: number;
	slug: string;
	title: string;
    posterUrl: string;
    isComingSoon: boolean;
    fromPrice: number;
    kind: string;
    ageRating: {
        code: string;
        minAge?: number;
        description?: string;
    };
    runtimeMinutes: number;
    isFeatured: boolean;
}

export interface FeaturedMovie extends SearchMovie {
    synopsis: string;
    releaseDate: string;
    backdropUrl: string;
    genres: Array<{
        id: number;
        slug: string;
        name: string;
    }>;
    formats: Array<{
        id: number;
        slug: string;
        name: string;
        priceUplift: number;
    }>;
}

interface FeaturedMoviesResponse {
    data: FeaturedMovie[];
}

interface SearchResponse {
	data: SearchMovie[];
}

export async function getMovies(signal?: AbortSignal): Promise<FeaturedMovie[]> {
	const response = await api.get<FeaturedMoviesResponse>('/movies/featured', { signal });

	return response.data.data;
}

export async function searchMovies(
	query: string,
	signal?: AbortSignal,
): Promise<SearchMovie[]> {
	const response = await api.get<SearchResponse>('/search', {
		params: { q: query.trim() },
		signal,
	});

	return response.data.data;
}
