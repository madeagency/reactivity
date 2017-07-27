import universal from 'react-universal-component'
import Loading from '../../components/Loading/Loading'

export default universal(() => import('./About'), {
  resolve: () => require.resolveWeak('./About'),
  chunkName: 'About', // babel-plugin-dual-import automatically sets chunkName based on path
  loading: Loading
})
