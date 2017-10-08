// @flow

import React from 'react'
import GithubButton from 'components/GithubButton/GithubButton'
import style from './Hero.scss'
import logo from './logo.svg'
import github from './github.svg'

const Hero = () => (
  <div className={style.Hero}>
    <div className={style.Header}>
      <img src={logo} className={style.Logo} alt="logo" />
      <h1 className={style.Heading}>
        Reactivity
      </h1>
      <del><i>n.</i> The quality of being reactive or the degree to which something is reactive.</del>
      <h2><i>n.</i> Boilerplate for Power Users.</h2>
      <p>
        <a
          href="https://github.com/madeagency/reactivity"
          rel="noopener noreferrer"
          target="_blank"
          className={style.githubLink}
        >
          <img src={github} className={style.github} alt="github" /> View on Github
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
      <p className={style.props}>
        <span>Created with love from the team at </span>
        <a
          href="https://www.madecode.co.za/"
          rel="noopener noreferrer"
          target="_blank"
          className={style.link}
        >
          MADE Code
        </a>
      </p>
    </div>
  </div>
)

export default Hero
