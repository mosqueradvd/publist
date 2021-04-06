import styled, { keyframes } from 'styled-components'

const load3 = keyframes`
0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
100% {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}
`

export default styled.div`
  loader {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 5em;
    height: 5em;
    border-radius: 50%;
    background: var(--brand-color);
    background: -moz-linear-gradient(
      left,
      var(--brand-color) 10%,
      rgba(128, 0, 255, 0) 42%
    );
    background: -webkit-linear-gradient(
      left,
      var(--brand-color) 10%,
      rgba(128, 0, 255, 0) 42%
    );
    background: -o-linear-gradient(
      left,
      var(--brand-color) 10%,
      rgba(128, 0, 255, 0) 42%
    );
    background: -ms-linear-gradient(
      left,
      var(--brand-color) 10%,
      rgba(128, 0, 255, 0) 42%
    );
    background: linear-gradient(
      to right,
      var(--brand-color) 10%,
      rgba(128, 0, 255, 0) 42%
    );
    position: relative;
    -webkit-animation: ${load3} 1.4s infinite linear;
    animation: ${load3} 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  &:before {
    width: 50%;
    height: 50%;
    background: var(--brand-color);
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  &:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`
