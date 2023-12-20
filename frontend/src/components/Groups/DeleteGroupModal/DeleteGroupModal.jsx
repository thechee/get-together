import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../context/Modal';
import { thunkDeleteGroup } from '../../../store/groups';
import './DeleteGroupModal.css'

const DeleteGroupModal = ({ groupId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const handleDelete = (e) => {
    e.preventDefault()
    // console.log(groupId)
    dispatch(thunkDeleteGroup(groupId))
    closeModal()
    navigate('/groups')
  }

  const handleCancel = (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h3>Are you sure you want to remove this group?</h3>
      <button onClick={handleDelete}>Yes (Delete Group)</button>
      <button onClick={handleCancel}>No (Keep Group)</button>
    </div>
  );
}

export default DeleteGroupModal;