import universal from 'react-universal-component'

export default universal(() => import('./Menu'), {
  resolve: () => require.resolveWeak('./Menu'),
  chunkName: 'Menu', // babel-plugin-dual-import automatically sets chunkName based on path
  minDelay: 0
})
