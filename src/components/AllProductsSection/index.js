import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoader: true,
  }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = async () => {
    const apiUrl = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.products.map(each => ({
        title: each.title,
        brand: each.brand,
        imageUrl: each.image_url,
        rating: each.rating,
        id: each.id,
        price: each.price,
      }))
      this.setState({
        productsList: updatedData,
        isLoader: false,
      })
    }
  }

  renderProductsList = () => {
    const {productsList, isLoader} = this.state
    return (
      <div>
        {isLoader ? (
          <Loader type="Hearts" height={40} width={40} />
        ) : (
          <>
            <h1 className="products-list-heading">All Products</h1>
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
