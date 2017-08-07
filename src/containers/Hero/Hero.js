import React from 'react'
import GithubButton from 'components/GithubButton/GithubButton'
import style from './Hero.scss'
import logo from './logo.svg'
import github from './github.svg'

const Hero = () => (
  <div className={style.Hero}>
    <div className={style.Header}>
      <img src={logo} className={style.Logo} alt="logo" />
      <h1 className={style.Heading}>Welcome to Reactivity</h1>
      <h2>A Boilerplate for Power Users.</h2>
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
        user="madeagency"
        repo="reactivity"
        type="star"
        width={160}
        height={30}
        count
        large
      />
      <GithubButton
        user="madeagency"
        repo="reactivity"
        type="fork"
        width={160}
        height={30}
        count
        large
      />
      <p className={style.props}>
        Created with love from the team at Made Code.
      </p>
    </div>
  </div>
)

export default Hero
