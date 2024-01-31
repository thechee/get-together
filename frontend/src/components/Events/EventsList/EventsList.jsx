import EventsListItem from '../EventsListItem';
import { NavLink, useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './EventsList.css'
import { useEffect, useState } from 'react';
import { thunkSearchEvents } from '../../../store/search';

const EventsList = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(20)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [searchedParams, setSearchedParams] = useState({})
  const searchedEvents = useSelector(state => state.search.Events)
  const eventsObj = useSelector(state => state.events)
  let events = Object.values(eventsObj)
  
  console.log('searched events:', searchedEvents)

  useEffect(() => {
    const searchObj = {};
    if (page) searchObj.page = page
    if (size) searchObj.size = size
    if (name) searchObj.name = name
    if (type) searchObj.type = type
    if (startDate) searchObj.startDate = startDate
  
    setSearchedParams(searchObj)
    dispatch(thunkSearchEvents(searchObj))
      .then((res) => res)
      .catch(async (e) => {
        const error = await e.json()
        console.log(error)
      })
  }, [dispatch, page, size, name, type, startDate])

  if (Object.values(searchedEvents).length > 0 || startDate || page) events = Object.values(searchedEvents);

  events?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
  const upcoming = [];
  const past = [];
  const currentTime = Date.now()

  events.forEach(event => {
    Date.parse(event.startDate) < currentTime ?
      past.push(event) :
      upcoming.push(event)
  })

  return (
    <div className='events-list-page'>
      <div className='page-links'>
        <NavLink to='/events'>Events</NavLink>
        <NavLink to='/groups'>Groups</NavLink>
        <h1>Events in Meetup</h1>
      </div>
      <section className='search-bar'>
        <label htmlFor="event-search">Search for an event by name:</label>
        <input type="search" id="event-search" value={name} onChange={e => setName(e.target.value)}/>
        <label htmlFor="type-select">
          <span>Event type:</span>
        </label>
        <select name='type-select' value={type} onChange={(e) => setType(e.target.value)}>
          <option disabled>
            (select one)
          </option>
          <option value="">Any</option>
          <option value="In person">In person</option>
          <option value="Online">Online</option>
        </select>
        <label htmlFor="">
          <span>Event date:</span>
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </section>
      <label htmlFor="size-select">Events per page</label>
      <select name='size-select' value={size} onChange={e => setSize(e.target.value)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <label htmlFor="past-events">Show Past Events</label>
      <input type="checkbox" />
      <div>
        <label htmlFor="page-select">Page</label>
        <input type="number" value={page} onChange={e => setPage(e.target.value)}/>
      </div>
      <section>
        <div>
        </div>
      </section>
      <section>
        <ul className='events-list'>
          {upcoming?.map(event => (
            <EventsListItem 
              eventId={event.id}
              key={event.id}
            />
          ))}
          {past.length > 0 && <h2>Past Events</h2>}
          {past.length > 0 && past.map(event => (
              <EventsListItem 
              eventId={event.id}
              key={event.id}
            />
          ))}
        </ul>
      </section>

    </div>
  );
}

export default EventsList;