
import React from 'react';

interface TaskCardProps {
  taskNumber: number;
  description: string;
  children: React.ReactNode;
  onCheck: () => void;
  isCorrect: boolean | null;
  resetLabel?: string;
  onReset?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  taskNumber, 
  description, 
  children, 
  onCheck, 
  isCorrect,
  onReset 
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 transform transition-all duration-300 hover:shadow-2xl border-t-8 border-blue-400">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
            {taskNumber}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Задание {taskNumber}</h2>
        </div>
        
        <p className="text-gray-600 text-lg mb-8 leading-relaxed whitespace-pre-line">
          {description}
        </p>
        
        <div className="mb-8">
          {children}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onCheck}
            className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform active:scale-95 shadow-md ${
              isCorrect === true 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : isCorrect === false
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCorrect === true ? 'Правильно! ✨' : isCorrect === false ? 'Попробуй еще раз ❌' : 'Проверить ответ'}
          </button>
          
          {onReset && (
            <button
              onClick={onReset}
              className="py-4 px-8 rounded-2xl font-bold text-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 shadow-sm"
            >
              Сбросить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
