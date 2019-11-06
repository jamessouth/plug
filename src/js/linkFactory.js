const linkTemplate = document.createElement('template');

const htmlTag = `
<a rel="noopener noreferrer">
</a>
<style>
a{
  display: block;
  border: 2px solid transparent;
  padding: 4px;
}
a:focus,
a:hover{
  outline: none;
  border: 2px solid #1a2845;
`;

class Link extends HTMLElement {
  constructor({ link, alt }) {
    super();
    Object.assign(this, { link, alt });
    const shadowRoot = this.attachShadow({ mode: 'open' });
    linkTemplate.innerHTML = htmlTag;
    shadowRoot.appendChild(linkTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.anchor.setAttribute('href', this.link);
  }

  get anchor() {
    return this.shadowRoot.querySelector('a');
  }

}

export default function linkFactory(div, aLink) {
  const link = new Link(aLink);
  div.appendChild(link);
}

window.customElements.define('contact-link', Link);
