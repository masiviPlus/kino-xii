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

export interface CatalogueMovie {
    id: number;
    slug: string;
    title: string;
    posterUrl: string;
    backdropUrl?: string | null;
    releaseDate?: string | null;
    synopsis?: string | null;
    runtimeMinutes?: number | null;
    fromPrice?: number | null;
    ageRating?: { code: string } | null;
    genres?: Array<{ id: number; slug: string; name: string }>;
}

interface CatalogueMoviesResponse {
    data: CatalogueMovie[];
}

export async function getNowPlayingMovies(
    signal?: AbortSignal,
): Promise<CatalogueMovie[]> {
    const response = await api.get<CatalogueMoviesResponse>('/movies/now-playing', { signal });
    return response.data.data;
}

export async function getComingSoonMovies(
    signal?: AbortSignal,
): Promise<CatalogueMovie[]> {
    const response = await api.get<CatalogueMoviesResponse>('/movies/coming-soon', { signal });
    return response.data.data;
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
