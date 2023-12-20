import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../context/Modal';
import { thunkDeleteEvent } from '../../../store/events';
import './DeleteEventModal.css';

const DeleteEventModal = ({ event }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(thunkDeleteEvent(event.id))
    closeModal()
    navigate(`/groups/${event.groupId}`)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h3>Are you sure you want to remove this event?</h3>
      <button onClick={handleDelete}>Yes (Delete Event)</button>
      <button onClick={handleCancel}>No (Keep Event)</button>
    </div>
  );
}

export default DeleteEventModal;