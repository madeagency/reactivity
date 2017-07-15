import universal from 'react-universal-component'

export default universal(() => import('./Home'), {
  resolve: () => require.resolveWeak('./Home'),
  chunkName: 'Home' // babel-plugin-dual-import automatically sets chunkName based on path
})
