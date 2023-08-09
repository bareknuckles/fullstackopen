const Note = ({note, toggleImportanceOf}) => {
    const label = note.important ? 'Make important' : 'Make not important'
    
    return (
    <li>
        {note.content}
        <button onClick={toggleImportanceOf}>{label}</button>
    </li>
    )
}

export default Note;