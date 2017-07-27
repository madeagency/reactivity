import universal from 'react-universal-component'
import Loading from '../../components/Loading/Loading'

export default universal(() => import('./Home'), {
  resolve: () => require.resolveWeak('./Home'),
  chunkName: 'Home', // babel-plugin-dual-import automatically sets chunkName based on path
  loading: Loading
})
