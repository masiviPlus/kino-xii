"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
	getComingSoonMovies,
	getNowPlayingMovies,
	type CatalogueMovie,
} from '../../../lib/api/movies';
import './MovieSection.scss';

type MovieSectionVariant = 'now-playing' | 'coming-soon';

interface MovieSectionProps {
	title: string;
	variant: MovieSectionVariant;
	onSeeAll?: () => void;
}

const priceFormatter = new Intl.NumberFormat('ka-GE', {
	maximumFractionDigits: 0,
});

const formatPrice = (amount: number) => `₾${priceFormatter.format(amount)}`;

function formatReleaseDate(releaseDate?: string | null) {
	if (!releaseDate) return 'Coming soon';

	const date = new Date(`${releaseDate}T00:00:00`);
	if (Number.isNaN(date.getTime())) return 'Coming soon';

	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(date);
}

export default function MovieSection({
	title,
	variant,
	onSeeAll,
}: MovieSectionProps) {
	const [movies, setMovies] = useState<CatalogueMovie[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		const loadMovies = async () => {
			try {
				const results =
					variant === 'now-playing'
						? await getNowPlayingMovies(controller.signal)
						: await getComingSoonMovies(controller.signal);
				setMovies(results);
			} catch {
				if (!controller.signal.aborted) setHasError(true);
			} finally {
				if (!controller.signal.aborted) setIsLoading(false);
			}
		};

		void loadMovies();
		return () => controller.abort();
	}, [variant]);

	return (
		<section className={`movie-section movie-section--${variant}`}>
			<header className="movie-section__header">
				<h2 className="movie-section__heading">{title}</h2>
				{onSeeAll && (
					<button
						className="movie-section__see-all"
						type="button"
						onClick={onSeeAll}
					>
						See all
					</button>
				)}
			</header>

			{isLoading ? (
				<div className="movie-section__track" aria-busy="true">
					{Array.from({ length: variant === 'now-playing' ? 6 : 4 }).map(
						(_, index) => (
							<div
								className="movie-section__skeleton"
								key={index}
								aria-hidden="true"
							/>
						),
					)}
				</div>
			) : hasError ? (
				<p className="movie-section__message" role="alert">
					Could not load {title.toLowerCase()}.
				</p>
			) : movies.length === 0 ? (
				<p className="movie-section__message">No movies to show right now.</p>
			) : (
				<div className="movie-section__track">
					{movies.map((movie) =>
						variant === 'now-playing' ? (
							<article className="movie-section__card" key={movie.id}>
								<div className="movie-section__poster">
									<Image
										src={movie.posterUrl}
										alt={`${movie.title} poster`}
										fill
										sizes="(max-width: 768px) 150px, 180px"
									/>
								</div>
								<h3 className="movie-section__movie-title">{movie.title}</h3>
								<p className="movie-section__metadata">
									{[movie.genres?.[0]?.name, movie.runtimeMinutes && `${movie.runtimeMinutes} min`]
										.filter(Boolean)
										.join(' · ')}
								</p>
								<p className="movie-section__price">
									{movie.fromPrice != null
										? `From ${formatPrice(movie.fromPrice)}`
										: 'Now playing'}
								</p>
							</article>
						) : (
							<article className="movie-section__coming-card" key={movie.id}>
								<div className="movie-section__coming-image">
									<Image
										src={movie.backdropUrl || movie.posterUrl}
										alt={`${movie.title} artwork`}
										fill
										sizes="(max-width: 768px) 280px, 340px"
									/>
								</div>
								<div className="movie-section__coming-details">
									<p className="movie-section__release-date">
										Coming {formatReleaseDate(movie.releaseDate)}
									</p>
									<h3 className="movie-section__movie-title">{movie.title}</h3>
									<p className="movie-section__metadata">
										{movie.ageRating?.code}
										{movie.ageRating?.code && movie.runtimeMinutes ? ' · ' : ''}
										{movie.runtimeMinutes ? `${movie.runtimeMinutes} min` : ''}
									</p>
								</div>
							</article>
						),
					)}
				</div>
			)}
		</section>
	);
}
