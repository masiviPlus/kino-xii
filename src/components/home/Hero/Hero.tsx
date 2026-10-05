"use client";

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Clock3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getMovies, type FeaturedMovie } from '../../../lib/api/movies';
import AllSessionsButton from './AllSessionsButton';
import BuyTicketsButton from './BuyTicketsButton';
import './Hero.scss';

export default function Hero() {
  const [featuredMovies, setFeaturedMovies] = useState<FeaturedMovie[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadFeaturedMovies = async () => {
      try {
        const movies = await getMovies(controller.signal);
        setFeaturedMovies(
          movies.filter((movie) => movie.isFeatured && movie.backdropUrl),
        );
      } catch {
        if (!controller.signal.aborted) {
          setFeaturedMovies([]);
          setHasError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadFeaturedMovies();

    return () => controller.abort();
  }, []);

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track || featuredMovies.length === 0) return;

    const wrappedIndex =
      ((index % featuredMovies.length) + featuredMovies.length) %
      featuredMovies.length;

    track.scrollTo({
      left: wrappedIndex * track.clientWidth,
      behavior: 'smooth',
    });
  };

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;

    setActiveSlide(Math.round(track.scrollLeft / track.clientWidth));
  };

  useEffect(() => {
    if (featuredMovies.length < 2) return;

    const timeoutId = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;

      const nextSlide = (activeSlide + 1) % featuredMovies.length;
      track.scrollTo({
        left: nextSlide * track.clientWidth,
        behavior: 'smooth',
      });
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [activeSlide, featuredMovies.length]);

  if (isLoading) {
    return (
      <section className="hero hero--loading" aria-label="Featured movies" aria-busy="true">
        <span className="sr-only">Loading featured movies</span>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className="hero hero--message" role="alert">
        Featured movies could not be loaded.
      </section>
    );
  }

  if (featuredMovies.length === 0) {
    return (
      <section className="hero hero--message">
        No featured movies are available.
      </section>
    );
  }

  return (
    <section className="hero" aria-label="Featured movies">
      <div
        className="hero__track"
        id="featured-movies-track"
        ref={trackRef}
        onScroll={handleTrackScroll}
        tabIndex={0}
        aria-label="Featured movie slides"
      >
        {featuredMovies.map((movie, index) => (
          <article
            className="hero__slide"
            key={movie.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${featuredMovies.length}: ${movie.title}`}
          >
            <Image
              className="hero__image"
              src={movie.backdropUrl}
              alt={`${movie.title} backdrop`}
              fill
              priority={index === 0}
              sizes="100vw"
            />
            <div className="hero__scrim" aria-hidden="true" />
            <div className="hero__caption">
              <p className="hero__eyebrow">
                Premiere · Week of{' '}
                {new Intl.DateTimeFormat('en-GB', {
                  day: 'numeric',
                  month: 'short',
                }).format(new Date(`${movie.releaseDate}T00:00:00`))}
              </p>
              <h1 className="hero__title">{movie.title}</h1>
              <div className="hero__metadata" aria-label="Movie details">
                <span className="hero__metadata-item hero__metadata-item--rating">
                  {movie.ageRating.code}
                </span>
                <span className="hero__metadata-item">
                  <Clock3 size={14} aria-hidden="true" />
                  {movie.runtimeMinutes} min
                </span>
                {movie.formats.map((format) => (
                  <span className="hero__metadata-item" key={format.id}>
                    {format.name}
                  </span>
                ))}
              </div>
              <p className="hero__synopsis">{movie.synopsis}</p>
              <div className="hero__actions">
                <BuyTicketsButton movie={movie} />
                <AllSessionsButton movie={movie} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {featuredMovies.length > 1 && (
        <div
          className="hero__controls"
          role="group"
          aria-label="Featured movie navigation"
        >
          <div className="hero__dots" role="group" aria-label="Choose featured movie">
            {featuredMovies.map((movie, index) => (
              <button
                className="hero__dot"
                key={movie.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Show ${movie.title}`}
                aria-current={activeSlide === index ? 'true' : undefined}
                aria-controls="featured-movies-track"
              />
            ))}
          </div>
          <div className="hero__arrows">
            <button
              className="hero__arrow"
              type="button"
              onClick={() => goToSlide(activeSlide - 1)}
              aria-label="Previous featured movie"
              aria-controls="featured-movies-track"
            >
              <ChevronLeft aria-hidden="true" size={22} />
            </button>
            <button
              className="hero__arrow"
              type="button"
              onClick={() => goToSlide(activeSlide + 1)}
              aria-label="Next featured movie"
              aria-controls="featured-movies-track"
            >
              <ChevronRight aria-hidden="true" size={22} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}