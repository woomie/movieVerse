import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const ReviewsList = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('movieId', '==', movieId)
        );

        const querySnapshot = await getDocs(q);
        const reviewsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setReviews(reviewsArray);
        
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);
 

  return (
    <div>
      <h3>Reviews:</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p><strong>{review.userName}</strong> says:</p>
            <p>{review.reviewText}</p>
            <small>{review.createdAt?.toDate().toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to leave one!</p>
      )}
    </div>
  );
};

export default ReviewsList;
