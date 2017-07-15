import universal from 'react-universal-component'

export default universal(() => import('./TypicalForm'), {
  resolve: () => require.resolveWeak('./TypicalForm'),
  chunkName: 'TypicalForm', // babel-plugin-dual-import automatically sets chunkName based on path
  minDelay: 500
})
