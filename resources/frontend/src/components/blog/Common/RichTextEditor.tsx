import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link, ImageIcon, Code, AlignLeft, AlignCenter, AlignRight, Undo, Redo } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const executeCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            executeCommand('createLink', url);
        }
    };

    const insertImage = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            executeCommand('insertImage', url);
        }
    };

    return (
        <div className="border border-gray-300 rounded-md">
            <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1">
                <button type="button" onClick={() => executeCommand('bold')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Bold">
                    <Bold size={16} />
                </button>
                <button type="button" onClick={() => executeCommand('italic')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Italic">
                    <Italic size={16} />
                </button>
                <button type="button" onClick={() => executeCommand('underline')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Underline">
                    <Underline size={16} />
                </button>
                <div className="w-px bg-gray-300 mx-1" />

                <button type="button" onClick={() => executeCommand('insertUnorderedList')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Bullet List">
                    <List size={16} />
                </button>
                <button type="button" onClick={() => executeCommand('insertOrderedList')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Numbered List">
                    <ListOrdered size={16} />
                </button>

                <div className="w-px bg-gray-300 mx-1" />

                <button type="button" onClick={() => executeCommand('justifyLeft')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Align Left">
                    <AlignLeft size={16} />
                </button>
                <button type="button" onClick={() => executeCommand('justifyCenter')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Align Center">
                    <AlignCenter size={16} />
                </button>
                <button type="button" onClick={() => executeCommand('justifyRight')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Align Right">
                    <AlignRight size={16} />
                </button>

                <div className="w-px bg-gray-300 mx-1" />

                <button type="button" onClick={insertLink} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Insert Link">
                    <Link size={16} />
                </button>
                <button type="button" onClick={insertImage} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Insert Image">
                    <ImageIcon size={16} />
                </button>

                <div className="w-px bg-gray-300 mx-1" />

                <select onChange={(e) => executeCommand('formatBlock', e.target.value)} className="px-2 py-1 border border-gray-300 rounded text-sm">
                    <option value="p">Paragraph</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                    <option value="h5">Heading 5</option>
                    <option value="h6">Heading 6</option>
                </select>

                <div className="w-px bg-gray-300 mx-1" />

                <button type="button" onClick={() => executeCommand('undo')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Undo">
                    <Undo size={16} />
                </button>
                <button type="button" onClick={() => executeCommand('redo')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Redo">
                    <Redo size={16} />
                </button>
            </div>

            <div ref={editorRef} contentEditable onInput={handleInput} className="p-4 min-h-[200px] focus:outline-none" placeholder={placeholder} dangerouslySetInnerHTML={{ __html: value }} />
        </div>
    );
};

export default RichTextEditor;
