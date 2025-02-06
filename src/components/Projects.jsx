import React from "react"
import { FaGithub } from 'react-icons/fa';
import project1 from "../assets/images/movie-Watchlist.jpg"
import project2 from "../assets/images/learning-journal.jpg"
import project3 from "../assets/images/van-life.jpg"

export default function Projects() {
    return(
      <>
        {/* <-- ***** Work ***** --> */}
        <section className="work" id="work">
          <div className="row">
            <h2 className='my-work-header'>My Work</h2>
            <div className="work__boxes">
              {/* <-- Each div with the work__box class is a project. --> */}
              <div className="work__box">
                <div className="work__text">
                  <h3>Movie Watchlist</h3>
                  <p>
                    A website where you can search for your favourite movies.
                  </p>
                  <ul className="work__list">
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                  </ul>
                  <div className="work__links">
                    <a href="https://nisar.surge.sh" target="_blank" className="link__text">
                      Visit Site <span>&rarr;</span>
                    </a>
                    <a href="https://github.com/chrisedeson/scrimba-homework/tree/main/movie_watchlist" target="_blank" rel="noopener noreferrer">
                      <FaGithub className="work__code" title="View Source Code" />
                    </a>
                  </div>
                </div>
                <div className="work__image-box">
                  <img src={project1} className="work__image" alt="Project 1" />
                </div>
              </div>
      
              <div className="work__box">
                <div className="work__text">
                  <h3>Learning Journal</h3>
                  <p>
                    An online Journal and Blog.
                  </p>
                  <ul className="work__list">
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>REST API Integration</li>
                  </ul>
                  <div className="work__links">
                    <a href="#" className="link__text">
                      Visit Site <span>&rarr;</span>
                    </a>
                    <a href="https://github.com/chrisedeson/scrimba-homework/tree/main/my_learning_journal" target="_blank" rel="noopener noreferrer">
                      <FaGithub className="work__code" title="View Source Code" />
                    </a>
                  </div>
                </div>
                <div className="work__image-box">
                  <img src={project2} className="work__image" alt="Learning Journal" />
                </div>
              </div>
      
              <div className="work__box">
                <div className="work__text">
                  <h3>Vanlife</h3>
                  <p>
                    An app for exploring and booking campervans for travel.
                  </p>
                  <ul className="work__list">
                    <li>React</li>
                    <li>Node.js</li>
                    <li>JavaScript</li>
                    <li>CSS</li>
                  </ul>
                  <div className="work__links">
                    <a href="#" className="link__text">
                      Visit Site <span>&rarr;</span>
                    </a>
                    <a href="hhttps://github.com/chrisedeson/scrimba-homework/tree/main/van-life" target="_blank" rel="noopener noreferrer">
                      <FaGithub className="work__code" title="View Source Code" />
                    </a>

                  </div>
                </div>
                <div className="work__image-box">
                  <img src={project3} className="work__image" alt="Van Life" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>      
    
    )
}