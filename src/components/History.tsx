import React from 'react';
import { Clock } from 'lucide-react';

interface HistoryProps {
  sessions: { duration: number; date: Date }[];
  totalTime: number;
}

const History: React.FC<HistoryProps> = ({ sessions, totalTime }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Meditation History</h2>
      <div className="mb-4 p-4 bg-indigo-100 rounded-lg">
        <p className="text-lg font-semibold flex items-center">
          <Clock size={24} className="mr-2 text-indigo-600" />
          Total Meditation Time: {Math.floor(totalTime / 60)} minutes
        </p>
      </div>
      <ul className="space-y-2">
        {sessions.map((session, index) => (
          <li key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
            <span>{session.date.toLocaleString()}</span>
            <span className="font-semibold">{session.duration / 60} minutes</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;