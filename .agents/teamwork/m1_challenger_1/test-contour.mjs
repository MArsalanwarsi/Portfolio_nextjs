import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ContourBackground from '../../../components/ContourBackground.tsx';

function runTests() {
  // Test 1: Dark surface
  const darkHtml = ReactDOMServer.renderToStaticMarkup(
    React.createElement(ContourBackground, { surface: 'dark' })
  );
  if (!darkHtml.includes('rgba(83, 84, 80, 0.28)')) {
    throw new Error('Dark stroke color missing');
  }
  if (!darkHtml.includes('vector-effect="non-scaling-stroke"')) {
    throw new Error('vector-effect missing');
  }

  // Test 2: Light surface
  const lightHtml = ReactDOMServer.renderToStaticMarkup(
    React.createElement(ContourBackground, { surface: 'light' })
  );
  if (!lightHtml.includes('rgba(40, 44, 32, 0.12)')) {
    throw new Error('Light stroke color missing');
  }

  // Test 3: Default surface
  const defaultHtml = ReactDOMServer.renderToStaticMarkup(
    React.createElement(ContourBackground)
  );
  if (!defaultHtml.includes('rgba(83, 84, 80, 0.28)')) {
    throw new Error('Default surface did not fallback to dark');
  }

  console.log('ContourBackground Server-Side Render: 3/3 PASS');
}

runTests();
