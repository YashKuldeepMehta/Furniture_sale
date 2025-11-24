import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/customerReviews.css';
import {FaStar} from 'react-icons/fa';
import axios from 'axios';
import { useEffect,useState } from 'react';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
   const profileImages = ["/images/cust1.jpg","/images/cust2.jpg","/images/cust3.jpg"];

  const getRandomImage = () => {
    return profileImages[Math.floor(Math.random() * profileImages.length)];
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/fetchreviews");
        setReviews(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < count ? 'star filled' : 'star'}><FaStar/></span>
    ));
  };

  return (
    <div className="reviews-container">
      <h1>Customer Reviews</h1>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000 }}
        grabCursor={true}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="review-card">
              <img src={getRandomImage()} alt={review.name}/>
              <div className="stars">{renderStars(review.rating)}</div>
              <p className="review-text">"{review.text}"</p>
              <p className="review-author">- {review.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerReviews;
