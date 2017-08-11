import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Event} from './event.model';
import {ToasterService} from 'angular2-toaster';

@Injectable()
export class EventsService {
  constructor(@Inject(Http) private http: Http,  private toasterService: ToasterService) {
  }

  errorException(error) {
    console.log(error);
    this.toasterService.pop('error', 'Error', `code: ${error.statusCode}, message: ${error.code || error.message}`);
    return Promise.reject(error);
  }

  getEvents(): Promise<Event[]> {
    return this.http.get('/api/events')
      .toPromise()
      .then(response => response.json() as Event[])
      .then((events: Event[]) => Promise.resolve(events))
      .catch(err => Promise.reject(err));
  }
  getEvent(id: string): Promise<Event> {
    return this.http.get(`/api/events/${id}`)
      .toPromise()
      .then(response => response.json() as Event)
      .then((event: Event) => Promise.resolve(event))
      .catch(err => Promise.reject(err));
  }
  getEventByFilter(id: string, filterQuery: string): Promise<any> {
    return this.http.get(`/api/events/${id}?filter${filterQuery}`)
      .toPromise()
      .then(response => response.json())
      .then((event: any) => Promise.resolve(event))
      .catch(err => this.errorException(err.json().error));
  }
  getCurrentEvent(): Promise<any> {
    return this.http.get('/api/current-event')
      .toPromise()
      .then(response => response.json())
      .then((event: any) => Promise.resolve(event))
      .catch(err => Promise.reject(err));
  }
  setCurrentEvent(eventId: string): Promise<any> {
    return this.http.put('/api/current-event', {currentEventId: eventId})
      .toPromise()
      .then(response => {
        console.log(response);
        return Promise.resolve(response.json());
      })
      .catch(err => Promise.reject(err));
  }
  finishCurrentEvent(): Promise<any> {
    return this.http.delete('/api/current-event')
      .toPromise()
      .then(response => Promise.resolve(response.json()))
      .catch(err => Promise.reject(err));
  }
  updateEvent(event: Event): Promise<any> {
    return this.http.post(`/api/events/${event.id}/replace`, event)
      .toPromise()
      .then(data => {
        console.log(data);
        return Promise.resolve(data);
      })
      .catch(err => this.errorException(err.json().error));
  }
  createEvent(event: Event): Promise<any> {
    return this.http.post('/api/events', event)
      .toPromise()
      .then(data => {
        console.log(data);
        return Promise.resolve(data);
      })
      .catch(err => this.errorException(err.json().error));
  }
}
