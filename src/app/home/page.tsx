'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation'
interface Note {
  _id: string;
  title: string;
  content: string;
  userId: string
}

export default function HomePage() {
  const router = useRouter()
  const [data, setData] = useState<string>('')
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() =>{
    const getUserDetail = async() =>{
      try {
        const res = await axios.get('/api/users/me');
        setData(res.data.data.username);
      } catch (error) {
        console.log(error);
      }
    }
    
    getUserDetail();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/notes/get');
        console.log('Fetched notes:', response); 
        const fetchedNotes = response.data.data;
        setNotes(fetchedNotes);
      } catch (error) {
        console.error('Error fetching notes:', error); 
        setError('Failed to fetch notes.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddNote = async () => {
    try {
      const newNote = { title, content }; 
      const response = await axios.post('/api/notes/create', newNote);
      setNotes((prevNotes) => ([...prevNotes, response.data.note])); 
      setTitle(''); 
      setContent(''); 
    } catch (error) {
      console.error('Error adding note:', error);
      setError('Failed to add note.');
    }
  };
  

  const handleDeleteNote = async (id: string) => {
    try {
      await axios.delete(`/api/notes/delete/${id}`);
      const updatedNotes = notes.filter(note => note._id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const handleLogout = async () =>{
    try {
      await axios.get('api/users/logout')
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Hello {data}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 mb-2 w-full"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="border p-2 mb-2 w-full"
          rows={4}
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Note
        </button>
      </div>
      <div>
        {notes.map((note) => (
          <div key={note._id} className="border p-4 mb-2 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            <p>{note.content}</p>
            <button
              onClick={() => handleDeleteNote(note._id)}
              className="bg-red-500 text-white p-1 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
