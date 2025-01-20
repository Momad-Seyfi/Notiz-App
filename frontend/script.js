const form = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');

// Neue Notiz erstellen
form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value;
  
    if (!title || !description || !category) {
      alert('Alle Felder müssen ausgefüllt sein.');
      return;
    }
  
    try {
      const response = await fetch('/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category }),
      });
  
      if (!response.ok) {
        throw new Error('Fehler beim Erstellen der Notiz');
      }
  
      form.reset();
      loadNotes();
    } catch (err) {
      alert(err.message);
    }
  });
  
  // Notizen laden
  async function loadNotes() {
    try {
      const res = await fetch('http://localhost:5000/notes');
      if (!res.ok) {
        throw new Error('Fehler beim Laden der Notizen');
      }
      const notes = await res.json();
  
      notesList.innerHTML = '';
      notes.forEach(note => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          <div>
            <strong>${note.title}</strong> (${note.category}): ${note.description}
          </div>
        `;
        notesList.appendChild(li);
      });
    } catch (err) {
      alert(err.message);
    }
  }

loadNotes();
