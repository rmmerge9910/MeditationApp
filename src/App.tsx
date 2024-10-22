import React, { useState, useEffect } from 'react';
import MeditationTimer from './components/MeditationTimer';
import History from './components/History';

function App() {
  const [sessions, setSessions] = useState<{ duration: number; date: Date }[]>([]);
  const [activeTab, setActiveTab] = useState<'timer' | 'history'>('timer');

  const addSession = (duration: number) => {
    setSessions([...sessions, { duration, date: new Date() }]);
  };

  const totalSessionTime = sessions.reduce((total, session) => total + session.duration, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-indigo-600">Zen Meditation</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${activeTab === 'timer' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('timer')}
          >
            Timer
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'history' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>
        {activeTab === 'timer' ? (
          <MeditationTimer onSessionComplete={addSession} />
        ) : (
          <History sessions={sessions} totalTime={totalSessionTime} />
        )}
      </div>
    </div>
  );
}

export default App;