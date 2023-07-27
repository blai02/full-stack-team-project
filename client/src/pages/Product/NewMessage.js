import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MessageForm from 'components/MessageForm';
import { createProductAction } from 'app/productSlice';

export default function NewMessage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);

  const handleSubmit = data => {
    dispatch(createProductAction({ userId: user.id, text: data.text })).then(
      () => {
        navigate('/');
      }
    );
  };

  return <MessageForm onSubmit={handleSubmit} />;
}
