function panelMarkupTag(strings, ...anchors) {
  const str = [...anchors].map((anc) => `<a rel="noopener noreferrer">${anc}</a>`).join('\n      ');

  return `
    <h3></h3>
    <p></p>
    <p></p>
    <div>
      ${str}
    </div>
    `;
}

const panelTemplate = document.createElement('template');

const styleTag = `
<style>
a:hover,
a:focus{
  outline: none;
  background-color: #1a2845;
  color: #e5d7ba;
}
h3, p, a{
  text-align: center;
  color: #30511d;
}
h3{
  font-size: 1.9em;
  line-height: 1.6;
  margin: 0;
}
p{
  margin: 0;
  font-size: 1.5em;
  line-height: 1;
  height: 24px;
  font-weight: bold;
}
p:last-of-type{
  border-bottom: 1px solid #30511d;
  padding-bottom: .5rem;
}
a{
  width: calc(100% - 2px);
  height: 30px;
  line-height: 0.8;
  font-size: 2em;
  text-decoration: none;
  border: 1px solid #30511d;
  font-weight: bold;
}
div{
  display: grid;
  grid: "top top" 90% "lbot rbot" 10% / 1fr 1fr;
  justify-items: center;
  width: 288px;
  height: 320px;
}
`;

const oneAnchorStyle = `
a{
  grid-column: 1 / -1;
`;

const twoAnchorsStyle = `
a:first-of-type{
  grid-area: lbot;
}
a:last-of-type{
  grid-area: rbot;
`;

class Panel extends HTMLElement {
  constructor({
    title, tech1, tech2, live, code, liveAria, codeAria,
  }, no) {
    super();
    Object.assign(this, {
      title, tech1, tech2, live, code, liveAria, codeAria,
    }, no);
    const shadowRoot = this.attachShadow({ mode: 'open' });
    panelTemplate.innerHTML = live ? `${panelMarkupTag`${`code`}${`live`}`}${styleTag}${twoAnchorsStyle}` : `${panelMarkupTag`${`code`}`}${styleTag}${oneAnchorStyle}`;
    shadowRoot.appendChild(panelTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.h3.textContent = this.title;
    this.anchors[0].setAttribute('href', this.code);
    this.anchors[0].setAttribute('aria-label', this.codeAria);
    this.live && this.anchors[1].setAttribute('href', this.live);
    this.liveAria && this.anchors[1].setAttribute('aria-label', this.liveAria);
    this.ps[0].textContent = this.tech1;
    this.ps[1].textContent = this.tech2;
  }

  get anchors() {
    return this.shadowRoot.querySelectorAll('a');
  }

  get div() {
    return this.shadowRoot.querySelector('div');
  }

  get h3() {
    return this.shadowRoot.querySelector('h3');
  }

  get ps() {
    return this.shadowRoot.querySelectorAll('p');
  }
}

export default function panelFactory(div, project) {
  const panel = new Panel(project);
  div.appendChild(panel);
}

window.customElements.define('project-panel', Panel);
