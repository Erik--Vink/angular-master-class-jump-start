import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {ApplicationState} from '../state/app.state';
import {select, Store} from '@ngrx/store';
import {LoadContactsSuccessAction} from '../state/contacts/contacts.actions';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  constructor(private contactsService: ContactsService, private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    const query = (state) => state.contacts.list;
    this.contacts$ = this.store.pipe(select(query));

    this.contactsService.getContacts().subscribe(contacts => {
      this.store.dispatch(new LoadContactsSuccessAction(contacts));
    });
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
