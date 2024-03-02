// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BsDashSquare} from 'react-icons/bs'

import {BsPlusSquare} from 'react-icons/bs'

import Cookies from 'js-cookie'

import SimilarProductItem from '../SimilarProductItem'

import Header from '../Header'

import './index.css'

const apiStatusRenderingValue = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    specificItemObject: {},
    similarItemsList: [],
    count: 1,
    apiStatus: apiStatusRenderingValue.initial,
  }
  componentDidMount() {
    this.getSpecificItem()
  }

  getSpecificItem = async () => {
    this.setState({apiStatus: apiStatusRenderingValue.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/products/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateSpecificItem = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }
      const updateSimilarProducts = updateSpecificItem.similarProducts.map(
        each => ({
          availability: each.availability,
          brand: each.brand,
          description: each.description,
          id: each.id,
          imageUrl: each.image_url,
          price: each.price,
          rating: each.rating,
          style: each.style,
          title: each.title,
          totalReviews: each.total_reviews,
        }),
      )
      console.log(updateSimilarProducts)
      this.setState({
        specificItemObject: updateSpecificItem,
        similarItemsList: updateSimilarProducts,
        apiStatus: apiStatusRenderingValue.success,
      })
    } else {
      this.setState({apiStatus: apiStatusRenderingValue.failure})
    }
  }

  changeButton = () => {
    const {history} = this.props
    history.replace('/products')
  }

  decreaseItems = () => {
    const {count} = this.state
    if (count <= 2) {
      this.setState({count: 1})
    } else {
      this.setState(pervState => ({count: pervState.count - 1}))
    }
  }

  increaseItems = () => {
    this.setState(pervState => ({count: pervState.count + 1}))
  }

  renderSpecificItemDetails = () => {
    const {specificItemObject, similarItemsList, count} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
    } = specificItemObject
    return (
      <div className="background-container-specific-item-details">
        <img src={imageUrl} alt="product" className="image-specific-product" />
        <div className="text-container-specific-details">
          <h1 className="heading-product-item-details">{title}</h1>
          <p className="price-text-specific-details">Rs {price}/-</p>
          <div className="reviews-stars-container">
            <div className="rating-stars-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="image-stars-style"
              />
              <p>{rating}</p>
            </div>

            <p className="total-review-text">{totalReviews} Reviews</p>
          </div>
          <p className="text-description">{description}</p>
          <p className="text-description">
            <span className="span-text-style">Available:</span> {availability}
          </p>
          <p className="text-description">
            <span className="span-text-style">Brand:</span> {brand}
          </p>
          <hr className="horizantal-line" />
          <div className="items-select-cart-container">
          <button
              onClick={this.decreaseItems}
              data-testid="minus"
              className="button-plus-minus"
            >
            <BsDashSquare
              className="icons-react"
              
            />
            </button>
            <p className="cart-save-items-text">{count}</p>
            <button
              onClick={this.increaseItems}
              data-testid="plus"
              className="button-plus-minus"
            >
              <BsPlusSquare className="icons-react" />
            </button>
          </div>
          <button className="buttn">ADD TO CART</button>
        </div>
      </div>
    )
  }

  failureView = () => {
    return (
      <>
        <Header />
        <div className="container-failure-view-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
            alt="failure view"
            className="failure-view-image-product-details"
          />
          <h1 className="heading-products-not-found">Product Not Found</h1>
          <button className="buttn-shopping" onClick={this.changeButton}>
            Continue Shopping
          </button>
        </div>
      </>
    )
  }

  successView = () => {
    const {similarItemsList} = this.state
    return (
      <>
        <Header />
        {this.renderSpecificItemDetails()}
        <div className="list-container-background">
          <h1 className="similar-product-text">Similar Products</h1>
          <ul className="list-container">
            {similarItemsList.map(each => (
              <SimilarProductItem similarItemsList={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  lodingView = () => {
    return (
      <div data-testid="loader" className="loading-spinner-style">
        <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusRenderingValue.inprogress:
        return this.lodingView()
      case apiStatusRenderingValue.success:
        return this.successView()
      case apiStatusRenderingValue.failure:
        return this.failureView()
      default:
        return null
    }
  }
}
export default ProductItemDetails
