import { api } from './client';

export interface SearchMovie {
	id: number;
	slug: string;
	title: string;
    posterUrl: string;
    backdropUrl: string;
    isComingSoon: boolean;
    fromPrice: number;
    kind: string;
	ageRating: {
        code: string;
	};
    runtimeMinutes: number;
}

interface SearchResponse {
	data: SearchMovie[];
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
