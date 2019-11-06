/* eslint-disable no-param-reassign */
import '../css/main.scss';
import projects from './projects';
import links from './links';

const projectDivs = document.querySelectorAll('.projects div');
const contactDivs = document.querySelectorAll('.contact div');
const firstArtImgs = document.querySelectorAll('.art_paint_one');
const secondArtImg = document.querySelector('.art_paint_two');
let asideNotBuilt = true;

const articles = document.querySelectorAll('.arts > div');

const IOoptions = {
  root: null,
  rootMargin: '0px 0px 420px 0px',
  threshold: 0.1,
};

const IOcallback = function IOcallback(panFact, linkFact) {
  return function innerIOCB(entries, observer) {
    entries.filter((entry) => entry.isIntersecting).forEach(({ target, target: { id } }) => {
      if (id.includes('x')) {
        linkFact(target, links[parseInt(id, 10)]);
      } else {
        panFact(target, projects[id]);
      }
      observer.unobserve(target);
    });
  };
};

Promise.all([
  import(/* webpackChunkName: "panelFactory" */ './panelFactory'),
  import(/* webpackChunkName: "linkFactory" */ './linkFactory'),
])
  .then(([panFact, linkFact]) => {
    const observer = new IntersectionObserver(IOcallback(
      panFact.default,
      linkFact.default,
    ), IOoptions);
    [
      ...projectDivs,
      ...contactDivs,
    ]
      .forEach((el) => observer.observe(el));
  })
  .catch((err) => console.log(err));
