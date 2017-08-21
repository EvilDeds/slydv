import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

marked.setOptions({ sanitize: true });
// Marked provides this option for parsing Markdown into HTML.
// Sanitize means that any HTML in the source is interpreted as a string.
// --> Protects against cross-site scripting
// --> Means we can use the dangerouslySetInnerHTML safely __after__ we sanitize
//     the inputs.


// These components provide different types of enclosing tags with the interior
// text rendered from Markdown

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

export function MarkdownAside(props) {
  return (
    <aside className="markdown markdown-aside" dangerouslySetInnerHTML={{ __html: marked(props.markdown) }} />
  );
}

export function MarkdownSpeakerNotes(props) {
  return (
    <aside className="markdown markdown-speaker-container">
      <h1 id="speaker-note-header">Speaker Notes</h1>
      <div className="markdown markdown-speaker-notes" dangerouslySetInnerHTML={{ __html: marked(props.markdown) }} />
    </aside>
  );
}


MarkdownSection.propTypes = {
  markdown: PropTypes.string.isRequired,
};
MarkdownHeader.propTypes = {
  markdown: PropTypes.string.isRequired,
};
MarkdownFooter.propTypes = {
  markdown: PropTypes.string.isRequired,
};
MarkdownAside.propTypes = {
  markdown: PropTypes.string.isRequired,
};
MarkdownAside.propTypes = {
  markdown: PropTypes.string.isRequired,
};
MarkdownSpeakerNotes.propTypes = {
  markdown: PropTypes.string.isRequired,
};

