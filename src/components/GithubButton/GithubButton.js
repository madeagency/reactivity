// @flow

import React from 'react'

type Props = {
  title: string,
  user: string,
  repo: string,
  type: 'star' | 'watch' | 'fork' | 'follow',
  width: number,
  height: number,
  count?: boolean,
  large?: boolean
}

const GithubButton = (props: Props) => {
  const { title, user, repo, type, width, height, count, large } = props
  let options = `?user=${user}&repo=${repo}&type=${type}`
  if (count) options += '&count=true'
  if (large) options += '&size=large'

  return (
    <iframe
      title={title}
      src={`https://ghbtns.com/github-btn.html${options}`}
      frameBorder="0"
      allowtransparency="true" // eslint-disable-line react/no-unknown-property
      scrolling="0"
      width={width}
      height={height}
      style={{ border: 'none', width, height }}
    />
  )
}

GithubButton.defaultProps = {
  count: false,
  large: false
}

export default GithubButton
