import React from "react";
import { FaGithub } from "react-icons/fa";
import project1 from "../assets/images/movie-watchlist.jpg";
import project2 from "../assets/images/learning-journal.jpg";
import project3 from "../assets/images/screenshot.jpg";
import project4 from "../assets/images/pollyglot.jpg";
import project5 from "../assets/images/skimmer.jpg";
import project6 from "../assets/images/weather-energy-pipeline-dashboard.jpg";

export default function Projects() {
  return (
    <>
      {/* <-- ***** Work ***** --> */}
      <section className="work" id="work">
        <div className="row">
          <h2 className="my-work-header">My Work</h2>
          <div className="work__boxes">
            {/* <-- Each div with the work__box class is a project. --> */}

            {/* MOVIE WATCHLIST */}
            <div className="work__box">
              <div className="work__text">
                <h3>Movie Watchlist</h3>
                <p>A website where you can search for your favourite movies.</p>
                <ul className="work__list">
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                  <li>REST API Integration</li>
                </ul>
                <div className="work__links">
                  <a
                    href="https://chrisflex-movie-watchlist.netlify.app/"
                    target="_blank"
                    className="link__text"
                  >
                    Visit Site <span>&rarr;</span>
                  </a>
                  <a
                    href="https://github.com/chrisedeson/scrimba-homework/tree/main/movie_watchlist"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="work__code" title="View Source Code" />
                  </a>
                </div>
              </div>
              <div className="work__image-box">
                <img src={project1} className="work__image" alt="Project 1" />
              </div>
            </div>

            {/* LEARNING JOURNAL */}
            <div className="work__box">
              <div className="work__text">
                <h3>Learning Journal</h3>
                <p>An online Journal and Blog.</p>
                <ul className="work__list">
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                </ul>
                <div className="work__links">
                  <a
                    href="https://chris-learning-journal.netlify.app/"
                    target="_blank"
                    className="link__text"
                  >
                    Visit Site <span>&rarr;</span>
                  </a>
                  <a
                    href="https://github.com/chrisedeson/scrimba-homework/tree/main/my_learning_journal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="work__code" title="View Source Code" />
                  </a>
                </div>
              </div>
              <div className="work__image-box">
                <img
                  src={project2}
                  className="work__image"
                  alt="Learning Journal"
                />
              </div>
            </div>

            {/* ASSEMBLY ENDGAME */}
            <div className="work__box">
              <div className="work__text">
                <h3>Assembly Endgame</h3>
                <p>An interactive word-guessing game.</p>
                <ul className="work__list">
                  <li>React</li>
                  <li>Node.js</li>
                  <li>JavaScript</li>
                  <li>CSS</li>
                </ul>
                <div className="work__links">
                  <a
                    href="https://chris-endgame.netlify.app/"
                    target="_blank"
                    className="link__text"
                  >
                    Visit Site <span>&rarr;</span>
                  </a>
                  <a
                    href="https://github.com/chrisedeson/scrimba-homework/tree/main/assembly-endgame"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="work__code" title="View Source Code" />
                  </a>
                </div>
              </div>
              <div className="work__image-box">
                <img
                  src={project3}
                  className="work__image"
                  alt="Assembly Endgame"
                />
              </div>
            </div>

            {/* POLLYGROT */}
            <div className="work__box">
              <div className="work__text">
                <h3>PollyGrot</h3>
                <p>A translation chatbot.</p>
                <ul className="work__list">
                  <li>React</li>
                  <li>Python</li>
                  <li>Uvicorn</li>
                  <li>FastAPI</li>
                  <li>Docker</li>
                  <li>Google Cloud CLI</li>
                  <li>Google Vertex AI</li>
                </ul>
                <div className="work__links">
                  <a
                    href="https://pollyglot-translate.netlify.app/"
                    target="_blank"
                    className="link__text"
                  >
                    Visit Site <span>&rarr;</span>
                  </a>
                  <a
                    href="https://github.com/chrisedeson/scrimba-homework/tree/main/pollyglot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="work__code" title="View Source Code" />
                  </a>
                </div>
              </div>
              <div className="work__image-box">
                <img src={project4} className="work__image" alt="PollyGrot" />
              </div>
            </div>

            {/* SKIMMER */}
            <div className="work__box">
              <div className="work__text">
                <h3>Skimmer</h3>
                <p>A fast, responsive recipe-skimming app.</p>
                <ul className="work__list">
                  <li>Javascript</li>
                  <li>HTML</li>
                  <li>CSS</li>
                </ul>
                <div className="work__links">
                  <a
                    href="https://skimmer-chef.netlify.app/"
                    target="_blank"
                    className="link__text"
                  >
                    Visit Site <span>&rarr;</span>
                  </a>
                  <a
                    href="https://github.com/chrisedeson/wdd330/tree/main/final-project"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="work__code" title="View Source Code" />
                  </a>
                </div>
              </div>
              <div className="work__image-box">
                <img
                  src={project5}
                  className="work__image"
                  alt="Skimmer Web App"
                />
              </div>
            </div>

            {/* TIC-TAC-TOE */}
            <div className="work__box">
              <div className="work__text">
                <h3>Tic-Tac-Toe</h3>
                <p>
                  A real-time multiplayer Tic-Tac-Toe game using WebSockets.
                </p>
                <ul className="work__list">
                  <li>React 19 (TypeScript)</li>
                  <li>React Router v7</li>
                  <li>Tailwind CSS</li>
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>Socket.IO</li>
                  <li>AWS EC2</li>
                  <li>AWS DynamoDB</li>
                </ul>
                <div className="work__links">
                  <a
                    href="https://tikky-tac.ddns.net/"
                    target="_blank"
                    className="link__text"
                    rel="noopener noreferrer"
                  >
                    Visit Site <span>&rarr;</span>
                  </a>
                  <a
                    href="https://github.com/chrisedeson/tic-tac-toe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="work__code" title="View Source Code" />
                  </a>
                </div>
              </div>
              <div className="work__image-box">
                <img
                  src="https://raw.githubusercontent.com/chrisedeson/tic-tac-toe/refs/heads/master/frontend/public/preview.jpg"
                  className="work__image"
                  alt="Online Tic Tac Toe Game"
                />
              </div>
            </div>

            {/* WEATHER–ENERGY PIPELINE */}
            <div className="work__box">
              <div className="work__text">
                <h3>Weather–Energy Pipeline</h3>
                <p>
                  A production-grade data pipeline and interactive dashboard
                  analyzing the relationship between weather and energy usage
                  across 5 major US cities.
                </p>
                <ul className="work__list">
                  <li>Python</li>
                  <li>Pandas</li>
                  <li>Plotly</li>
                  <li>Streamlit</li>
                  <li>NOAA & EIA APIs</li>
                  <li>GitHub Actions</li>
                </ul>
                <div className="work__links">
                  <a
                    href="https://weather-energy-pipeline.streamlit.app/"
                    target="_blank"
                    className="link__text"
                    rel="noopener noreferrer"
                  >
                    Visit Site <span>&rarr;</span>
                  </a>
                  <a
                    href="https://github.com/chrisedeson/weather-energy-pipeline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="work__code" title="View Source Code" />
                  </a>
                </div>
              </div>
              <div className="work__image-box">
                <img
                  src={project6}
                  className="work__image"
                  alt="Weather–Energy Dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
