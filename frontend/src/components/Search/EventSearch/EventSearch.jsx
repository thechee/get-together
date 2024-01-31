import { useState } from "react"

import EventsListItem from "../../Events/EventsListItem"

const EventSearch = ({data}) => {
  const dataArr = Object.values(data)[0]
  const [filteredData, setFilteredData] = useState([])

  const handleFilter = (e) => {
    const query = e.target.value;
    const newFilterArr = dataArr.filter(value => {
      return value.name.toLowerCase().includes(query.toLowerCase())
    });

    if (query === '') {
      setFilteredData([])
    } else {
      setFilteredData(newFilterArr)
    }
  }

  return (null
    // <div>
    //   <label htmlFor="event-search">Search for an event by name:</label>
    //   <input type="text" id="event-search" onChange={handleFilter}/>
    //   {filteredData.map(data => (
    //       <EventsListItem key={data.id} eventId={data.id}><Link to={`/${feature}/${data.id}`}>{data.name}</Link><EventsListItem />
    //     ))}
    // </div>
  )
}

export default EventSearch;