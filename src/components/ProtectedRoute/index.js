import {Route, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = props => {
  const Auth = Cookie.get('jwt_token')
  if (Auth === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
