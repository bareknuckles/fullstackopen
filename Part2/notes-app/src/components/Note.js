const Note = ({note, toggleImportanceOf, handleDelete}) => {
    const label = note.important ? 'Make important' : 'Make not important'
    
    return (
    <li>
        {note.content}
        <button onClick={toggleImportanceOf}>{label}</button>
        <button onClick={handleDelete}>Delete</button>
    </li>
    )
}

export default Note;