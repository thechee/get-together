import { useRouteError } from 'react-router-dom';
import { Layout } from '../../App';
import './NoMatch.css'

function NoMatch() {
  let error = useRouteError()
  
  return (
    <>
    <Layout />
    <div>
      <h1 className="four-oh-four error">{error.status}</h1>
      <h2 className="four-oh-four error">{error.statusText}</h2>
      <h2 className="four-oh-four error">{error.data.message}</h2>
    </div>
    </>
  )
}

export default NoMatch;