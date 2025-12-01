import React from 'react'
import Hero from './Hero/Hero'
import Discount from './discout/Discount'
import About from './about/About'
import Service from './services/Service'
import Programs from './programs/Programs'
import Products from './products/Products'
import TeamMessage from './teammessage/TeamMessage'
import Goal from './goals/Goals'
import Notice from './notice/Notice'

const Home = () => {
  return (
    <div>
      <Hero />
      <Discount />
      <About />
      <Service />
      <Programs />
      <Products />
      <TeamMessage />
      <Goal />
      <Notice/>
    </div>
  )
}

export default Home