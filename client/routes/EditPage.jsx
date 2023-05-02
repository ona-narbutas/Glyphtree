import React, { useState, useCallback, useMemo } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Editor, Transforms, Text } from 'slate';

import { useAppDispatch, useAppSelector } from '../hooks';
import { inputText } from '../slices/postSlice';

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

  isBlockActive(editor, blockType) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === blockType
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

  toggleBlock(editor, blockType) {
    const isActive = CustomEditor.isBlockActive(editor, blockType);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : blockType },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
}
    
const EditPage = () => {
  // Redux
  const dispatch = useAppDispatch();
  const postState = useAppSelector(state => state.post);
  const userState = useAppSelector(state => state.user);

  const [editor] = useState(() => withReact(createEditor()));
  
  // Initial value loads from local storage if there is anything, otherwise uses default
  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content')) || [
        {
          type: 'paragraph',
          children: [{ text: 'Tell us a story!' }]
        }
      ],
    []
  );
  console.log('initial value: ', initialValue)

  const renderElement = useCallback(props => {
    switch (props.element.children[0].type) {
      case 'code':
        return <CodeElement {...props} />
      case 'blockquote':
        return <blockquote {...props.attributes}>{props.children}</blockquote>;
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, []);
  
  const submitPost = async () => {
    try {
      const submitRes = await fetch('api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            content: postState.textEntry,
            parent_id: postState.parent_id,
            is_root: postState.is_root,
            author_id: userState.user_id
          }
        ) 
      });
      localStorage.removeItem('content');
    } catch (err) {
      console.error('ERROR: ', err)
    }
  }

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
            // call reducer to update store with text content
            dispatch(inputText(content));
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
                CustomEditor.toggleBlock(editor, 'code');
                break;
              }

              case '\'': {
                event.preventDefault();
                CustomEditor.toggleBlock(editor, 'blockquote');
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
                break;
              }
            }
          }}
        />
      </Slate>
      <button onClick={submitPost}>Submit</button>
    </>
  )
}

export default EditPage;