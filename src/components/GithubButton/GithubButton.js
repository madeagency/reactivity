// @flow

import React from 'react'

type Props = {
  title: string,
  user: string,
  repo: string,
  type: 'star' | 'watch' | 'fork' | 'follow',
  width: number,
  height: number,
  count?: string,
  large?: string
};

const GithubButton = (props: Props) => {
  const { title, user, repo, type, width, height, count, large } = props
  let src = `https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=${type}`
  if (count) src += '&count=true'
  if (large) src += '&size=large'

  return (
    <iframe
      title={title}
      src={src}
      frameBorder="0"
      allowTransparency="true"
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
