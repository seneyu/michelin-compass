import ReviewForm from './ReviewForm';
import { Restaurant, Review, ReviewFormData } from '../types/interface';

interface ModalProps {
  restaurants: Restaurant[];
  review: Review;
  onClose: () => void;
  onSubmit: (reviewId: number, updatedReview: ReviewFormData) => void;
}

const ModalUpdate: React.FC<ModalProps> = ({
  restaurants,
  review,
  onClose,
  onSubmit,
}) => {
  const handleUpdateSubmit = (updatedReview: ReviewFormData) => {
    onSubmit(review._id, updatedReview);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <h3>Update a Review</h3>
          <br />
          <ReviewForm
            review={review}
            onSubmit={handleUpdateSubmit}
            restaurants={restaurants}
          />
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalUpdate;
