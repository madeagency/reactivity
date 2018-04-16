// @flow

import React from 'react'
import { css } from 'emotion'
import GithubButton from 'components/GithubButton/GithubButton'
import logo from './logo.svg'
import github from './github.svg'

const HeroStyle = css`
  text-align: center;
`
const HeaderStyle = css`
  background-color: #222;
  padding: 20px;
  color: white;
`
const LogoStyle = css`
  animation: App-logo-spin infinite 20s linear;
  height: 200px;
`
const HeadingStyle = css`
  font-size: 3em;
  margin-top: 10px;
  margin-bottom: 0;
`
const IntroStyle = css`
  font-size: large;
`
const PropsStyle = css`
  color: #999;
  font-size: 12px;
`
const LinkStyle = css`
  color: #ddd;
  text-decoration: none;
  border-bottom: 1px solid gray;

  &:hover {
    color: #61dafb;
  }
`
const githubLink = css`
  display: inline-block;
  font-size: 20px;
  color: #ddd;
`
const githubStyle = css`
  height: 20px;
  vertical-align: top;
`

const Hero = () => (
  <div className={HeroStyle}>
    <div className={HeaderStyle}>
      <img src={logo} className={LogoStyle} alt="logo" />
      <h1 className={HeadingStyle}>Reactivity</h1>
      <del>
        <i>n.</i> The quality of being reactive or the degree to which something
        is reactive.
      </del>
      <h2>
        <i>n.</i> Boilerplate for Power Users.
      </h2>
      <p>
        <a
          href="https://github.com/madeagency/reactivity"
          rel="noopener noreferrer"
          target="_blank"
          className={githubLink}
        >
          <img src={github} className={githubStyle} alt="github" /> View on
          Github
        </a>
      </p>
      <GithubButton
        title="Star this project on github"
        user="madeagency"
        repo="reactivity"
        type="star"
        width={160}
        height={30}
        count
        large
      />
      <GithubButton
        title="Fork this project on github"
        user="madeagency"
        repo="reactivity"
        type="fork"
        width={160}
        height={30}
        count
        large
      />
      <p className={PropsStyle}>
        <span>Created with love from the team at </span>
        <a
          href="https://www.madecode.co.za/"
          rel="noopener noreferrer"
          target="_blank"
          className={LinkStyle}
        >
          MADE Code
        </a>
      </p>
    </div>
  </div>
)

export default Hero
