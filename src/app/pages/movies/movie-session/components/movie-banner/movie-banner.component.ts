import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { MoviesService } from 'src/app/shared/services/movies.service';

import { Movie } from 'src/app/shared/models/interfaces/movie.interface';


@Component({
  selector: 'app-movie-banner',
  templateUrl: './movie-banner.component.html',
  styleUrls: ['./movie-banner.component.scss']
})
export class MovieBannerComponent implements OnInit, OnDestroy {
  
  @Output() valorPopUp = new EventEmitter<number>();
  
  popup: number = 0;
  trailerUrl: any = "";

  subs: Subscription[] = [];

  movieId!: string;
  movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private sanitizer: DomSanitizer
  ) {
    this.movieId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    
    this.subs.push(
      this.moviesService.getMovie(this.movieId).subscribe( movie => {
          this.movie = movie;
      
          if (this.movie.images![1]){
            this.movie.images![1].url =  ` '${this.movie.images![1].url}' `
          }
    
          this.getTrailerUrl(this.movie?.trailers![0]!.url)
      })
    )
    
  }

  popupMode(numDiv: number): void {
    this.popup = numDiv;
    this.valorPopUp.emit(numDiv);
  }

  getTrailerUrl(videoUrl: string): void {
    let videoUrlSplitted = videoUrl.split("watch?v=");
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoUrlSplitted[1]);
  }

  ngOnDestroy(): void {
    this.subs.map(
      sub => sub.unsubscribe()
    );
  }


}
