import React from 'react'
import "./Home.css"
import image from "../Assets/checklist-task.gif"
export const Home = () => {
  return (
    <div className="container">
  <div className="row">
    <div className="col">
      <section className='section'>
      <img src={image} className="img-fluid" />
      </section>
    </div>
  </div>
  <div className="row">
    <div className="col">
      <section className='beautiful-paragraph'>
      <h2>hello there.</h2>
        <p>welcome to the best task management site, here you can work with your co-workers with a live server, all you need to do is signing up so harry up.</p>
      </section>
    </div>
  </div>
</div>
  )
}
