const NoteForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          onChange={handleChange} 
          value={value} 
        />
        <button type='submit'>save</button>
      </form>
    </div>
  );
}

export default NoteForm;
