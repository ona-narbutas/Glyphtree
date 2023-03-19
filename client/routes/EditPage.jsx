import React, { useState, useCallback, useMemo } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Editor, Transforms, Text } from 'slate';

import Nav from '../components/Nav';
import CodeElement from '../components/slate_blocks/CodeElement';
import DefaultElement from '../components/slate_blocks/DefaultElement';
import Leaf from '../components/slate_blocks/Leaf';

const CustomEditor = {
  isMarkActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: n => n[format] === true,
      universal: true
    })

    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    });

    return !!match;
  },

  toggleMark(editor, format) {
    const isActive = CustomEditor.isMarkActive(editor, format);
    const toggleOption = {};
    toggleOption[format] = isActive ? null : true;

    Transforms.setNodes(
      editor,
      toggleOption,
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  }
}
    
const EditPage = () => {
  const [editor] = useState(() => withReact(createEditor()));
  
  // Initial value loads from local storage if there is anything, otherwise uses default
  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content')) || [
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }]
        }
      ],
    []
  );
  console.log('initial value: ', initialValue)

  const renderElement = useCallback(props => {
    switch (props.element.children[0].type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, []);
  
  return (
    <>
      <Nav />
      <Slate 
        editor = {editor} 
        value={initialValue} 

        // Save data to local storage whenever change other than just selection occurs
        onChange = { value => {
          const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
            );
            if (isAstChange) {
            const content = JSON.stringify(value);
            localStorage.setItem('content', content);
          }
        }}
        >
        <Editable 
          renderElement = {renderElement}
          renderLeaf = {renderLeaf}

          onKeyDown = {event => {

            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              case '`': {
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
                break;
              }
              
              case 'b': {
                event.preventDefault();
                CustomEditor.toggleMark(editor, 'bold');
                break;
              }

              case 'i': {
                event.preventDefault();
                CustomEditor.toggleMark(editor, 'italic');
                break;
              }

              case 'u': {
                event.preventDefault();
                CustomEditor.toggleMark(editor, 'underline');
              }
            }
          }}
        />
      </Slate>
    </>
  )
}

export default EditPage;