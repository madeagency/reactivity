import universal from 'react-universal-component'

export default universal(() => import(/* webpackChunkName: 'Home' */ './Home'), {
  resolve: () => require.resolveWeak('./Home'),
  chunkName: 'Home',
  minDelay: 500
})
