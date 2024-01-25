import { useRouteError } from 'react-router-dom';
import './NoMatch.css'

function NoMatch() {
  let error = useRouteError()

  return (
    <div>
      <h1 className="four-oh-four error">{error.status}!!!</h1>
      <h2 className="four-oh-four error">Nothing to be found here</h2>
      <h2 className="four-oh-four error">Please navigate to the home page</h2>
    </div>
  )
}

export default NoMatch;