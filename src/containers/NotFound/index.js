import universal from 'react-universal-component'
import Loading from '../../components/Loading/Loading'

export default universal(() => import('./NotFound'), {
  resolve: () => require.resolveWeak('./NotFound'),
  chunkName: 'NotFound', // babel-plugin-dual-import automatically sets chunkName based on path
  loading: Loading
})
