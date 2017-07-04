import universal from 'react-universal-component'

export default universal(() => import(/* webpackChunkName: 'About' */ './About'), {
  resolve: () => require.resolveWeak('./About'),
  chunkName: 'About',
  minDelay: 500
})
