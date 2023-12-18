import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import Home from './components/Home';
import { CreateGroupForm, EditGroupForm, GroupDetails, GroupsList, ManageGroups} from './components/Groups';
import { CreateEventForm, EditEventForm, EventDetails, EventsList, ManageEvents} from './components/Events'

function Layout() {
  const dispatch = useDispatch();
  const [ isLoaded, setIsLoaded ] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.thunkRestoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'groups',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <GroupsList />,
          },
          {
            path: 'new',
            element: <CreateGroupForm />
          },
          {
            path: ':groupId',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <GroupDetails />,
              },
              {
                path: 'edit',
                element: <EditGroupForm />
              },
              {
                path: 'events/new',
                element: <CreateEventForm />
              }
            ]
          },
          {
            path: 'current',
            element: <ManageGroups />
          }
        ]
      },
      {
        path: 'events',
        element: <EventsList />,
        children: [
          {
            path: ':eventId',
            element: <EventDetails />,
            children: [
              {
                path: 'edit',
                element: <EditEventForm />
              }
            ]
          },
          {
            path: 'current',
            element: <ManageEvents />
          }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;