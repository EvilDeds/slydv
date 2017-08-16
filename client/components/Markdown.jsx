import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

// Sanitize means that any HTML in the source is interpreted as a string.
// --> Protects against cross-site scripting
// --> Means we can use the dangerouslySetInnerHTML after sanitize
marked.setOptions({ sanitize: true });

export function MarkdownSection(props) {
  return (
    <section className="markdown markdown-section" dangerouslySetInnerHTML={{ __html: marked(props.markdown) }} />
  );
}

export function MarkdownHeader(props) {
  return (
    <header className="markdown markdown-header" dangerouslySetInnerHTML={{ __html: marked(props.markdown) }} />
  );
}

export function MarkdownFooter(props) {
  return (
    <footer className="markdown markdown-footer" dangerouslySetInnerHTML={{ __html: marked(props.markdown) }} />
  );
}

[MarkdownSection, MarkdownFooter, MarkdownHeader].forEach((elem) => {
  elem.propTypes = {
    markdown: PropTypes.string.isRequired,
  };
});

