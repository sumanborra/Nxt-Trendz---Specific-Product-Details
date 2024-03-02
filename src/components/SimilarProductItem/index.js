// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarItemsList} = props
  const {imageUrl, title, brand, price, rating} = similarItemsList

  return (
    <li className="list-item-card">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-items-image"
      />
      <h1 className="title-text-similar-items">{title}</h1>
      <p className="barnd-text-similar-items">by {brand}</p>
      <div className="container-similar-itemprice-review">
        <p className="similar-items-price">Rs {price}/-</p>
        <div className="container-stars-rating">
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="stars-rating-similar"
          />
          <p className="rating-text-similar">{rating}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
