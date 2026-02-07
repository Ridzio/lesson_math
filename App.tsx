
import React, { useState, useCallback, useEffect } from 'react';
import TaskCard from './components/TaskCard';
import GlassIcon from './components/GlassIcon';

const App: React.FC = () => {
  // Overall state
  const [taskStates, setTaskStates] = useState<Record<number, any>>({});
  const [taskFeedback, setTaskFeedback] = useState<Record<number, boolean | null>>({});

  // Helper to update specific task state
  const updateTaskState = (id: number, val: any) => {
    setTaskStates(prev => ({ ...prev, [id]: val }));
    setTaskFeedback(prev => ({ ...prev, [id]: null }));
  };

  // --- Task Checking Logic ---
  const checkTask = (id: number) => {
    const state = taskStates[id];
    let correct = false;

    switch (id) {
      case 1: // 31, 62, 93 (any order)
        const vals1 = [state?.v1, state?.v2, state?.v3].map(v => parseInt(v)).sort();
        correct = JSON.stringify(vals1) === JSON.stringify([31, 62, 93]);
        break;
      case 2: // 4 and 6
        const vals2 = [parseInt(state?.v1), parseInt(state?.v2)].sort();
        correct = JSON.stringify(vals2) === JSON.stringify([4, 6]);
        break;
      case 3: // 10
        correct = parseInt(state) === 10;
        break;
      case 4: // 7
        correct = parseInt(state) === 7;
        break;
      case 5: // 3 and 6
        const vals5 = [parseInt(state?.v1), parseInt(state?.v2)].sort();
        correct = JSON.stringify(vals5) === JSON.stringify([3, 6]);
        break;
      case 6: // Task 6 logic: Part 1 then Part 2
        const p1Correct6 = (state?.water === 3 && state?.juice === 9);
        if (p1Correct6) {
          if (parseInt(state?.mors) === 12) {
            correct = true;
          } else {
            if (!state?.part1Verified) {
              updateTaskState(6, { ...state, part1Verified: true });
            }
            correct = false;
          }
        } else {
          correct = false;
        }
        break;
      case 7: // 15
        correct = parseInt(state) === 15;
        break;
      case 8: // Paint (1 white, 2 green, 3 total)
        const p1Correct8 = state?.white === 1 && state?.green === 2 && parseInt(state?.total) === 3;
        if (p1Correct8) {
          // Check Part 2 if it's being displayed
          if (state?.part1Verified) {
            const p2Correct = state?.p2_draggedCount === 4 && parseInt(state?.p2_finalAnswer) === 8;
            correct = p2Correct;
          } else {
            // Unlock Part 2
            updateTaskState(8, { ...state, part1Verified: true, p2_draggedCount: 0 });
            correct = false;
          }
        } else {
          correct = false;
        }
        break;
      case 9: // 18
        correct = parseInt(state) === 18;
        break;
      case 10: // 4 and 7
        const vals10 = [parseInt(state?.v1), parseInt(state?.v2)].sort();
        correct = JSON.stringify(vals10) === JSON.stringify([4, 7]);
        break;
      case 11: // 60 and 15
        correct = parseInt(state?.v1) === 60 && parseInt(state?.v2) === 15;
        break;
      case 12: // 1 and 16
        correct = parseInt(state?.v1) === 1 && parseInt(state?.v2) === 16;
        break;
      case 13: // (3,8) and (4,9)
        const p1_13 = [parseInt(state?.r1v1), parseInt(state?.r1v2)].sort();
        const p2_13 = [parseInt(state?.r2v1), parseInt(state?.r2v2)].sort();
        const solutions = [[3, 8], [4, 9]];
        const match1 = JSON.stringify(p1_13) === JSON.stringify(solutions[0]) && JSON.stringify(p2_13) === JSON.stringify(solutions[1]);
        const match2 = JSON.stringify(p1_13) === JSON.stringify(solutions[1]) && JSON.stringify(p2_13) === JSON.stringify(solutions[0]);
        correct = match1 || match2;
        break;
      case 14: // 35 and 9
        correct = parseInt(state?.v1) === 35 && parseInt(state?.v2) === 9;
        break;
    }

    setTaskFeedback(prev => ({ ...prev, [id]: correct }));
  };

  const progress = Object.values(taskFeedback).filter(v => v === true).length;
  const totalTasks = 14;

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Sticky Header with Progress */}
      <div className="sticky top-0 z-50 bg-[#f0f9ff]/90 backdrop-blur-md py-6 mb-8 border-b border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900">Математические приключения</h1>
            <p className="text-blue-600 font-semibold">Реши все 14 задач и стань мастером!</p>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-md border border-blue-200 min-w-[200px]">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Прогресс</span>
              <span className="text-sm font-bold text-blue-600">{Math.round((progress / totalTasks) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(progress / totalTasks) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs mt-2 text-gray-400 font-medium">{progress} из {totalTasks} решено</p>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-12">
        {/* Task 1 */}
        <TaskCard 
          taskNumber={1} 
          description="Найди все двузначные числа, у которых число десятков в 3 раза больше числа единиц. Ответ вводится по одному в каждую строку."
          isCorrect={taskFeedback[1]}
          onCheck={() => checkTask(1)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <input
                key={i}
                type="number"
                placeholder="Число"
                value={taskStates[1]?.[`v${i}`] || ''}
                onChange={e => updateTaskState(1, { ...taskStates[1], [`v${i}`]: e.target.value })}
                className="w-full p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
              />
            ))}
          </div>
        </TaskCard>

        {/* Task 2 */}
        <TaskCard 
          taskNumber={2} 
          description="Мистер Трудди задумал два однозначных числа, одно из которых на 2 больше другого. Произведение этих чисел равно 24."
          isCorrect={taskFeedback[2]}
          onCheck={() => checkTask(2)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-bold ml-2">Первое число</label>
              <input
                type="number"
                value={taskStates[2]?.v1 || ''}
                onChange={e => updateTaskState(2, { ...taskStates[2], v1: e.target.value })}
                className="p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-bold ml-2">Второе число</label>
              <input
                type="number"
                value={taskStates[2]?.v2 || ''}
                onChange={e => updateTaskState(2, { ...taskStates[2], v2: e.target.value })}
                className="p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
        </TaskCard>

        {/* Task 3 */}
        <TaskCard 
          taskNumber={3} 
          description="Чтобы сварить одну порцию вишнёвого варенья, мадам Роза берёт 1 кг сахара и 2 кг вишни. Сколько килограммов вишни потребуется мадам Розе для варенья, если она планирует сварить варенье из 5 килограммов сахара?"
          isCorrect={taskFeedback[3]}
          onCheck={() => checkTask(3)}
        >
          <div className="flex items-center gap-4 max-w-xs">
            <input
              type="number"
              placeholder="Результат"
              value={taskStates[3] || ''}
              onChange={e => updateTaskState(3, e.target.value)}
              className="w-full p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
            />
            <span className="text-xl font-bold text-gray-500">кг</span>
          </div>
        </TaskCard>

        {/* Task 4 */}
        <TaskCard 
          taskNumber={4} 
          description="Чтобы приготовить джем, Оливия берёт 1 кг сахара и 2 кг персиков. Сколько килограммов сахара требуется Оливии для джема, если она планирует сварить джем из 14 килограммов персиков?"
          isCorrect={taskFeedback[4]}
          onCheck={() => checkTask(4)}
        >
          <div className="flex items-center gap-4 max-w-xs">
            <input
              type="number"
              placeholder="Результат"
              value={taskStates[4] || ''}
              onChange={e => updateTaskState(4, e.target.value)}
              className="w-full p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
            />
            <span className="text-xl font-bold text-gray-500">кг</span>
          </div>
        </TaskCard>

        {/* Task 5 */}
        <TaskCard 
          taskNumber={5} 
          description="Флай задумала два однозначных числа, одно из которых в два раза больше другого. Произведение этих чисел равно 18."
          isCorrect={taskFeedback[5]}
          onCheck={() => checkTask(5)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-bold ml-2">Первое число</label>
              <input
                type="number"
                value={taskStates[5]?.v1 || ''}
                onChange={e => updateTaskState(5, { ...taskStates[5], v1: e.target.value })}
                className="p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-bold ml-2">Второе число</label>
              <input
                type="number"
                value={taskStates[5]?.v2 || ''}
                onChange={e => updateTaskState(5, { ...taskStates[5], v2: e.target.value })}
                className="p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
        </TaskCard>

        {/* Task 6 - Interactive Glass Grid + Second Part */}
        <TaskCard 
          taskNumber={6} 
          description="Для приготовления ягодного морса на 1 стакан воды берут 3 стакана ягодного сока. Чтобы приготовить морс, мадам Роза взяла 9 стаканов сока. Покажи на схеме, сколько стаканов воды и сока нужно взять."
          isCorrect={taskFeedback[6]}
          onCheck={() => checkTask(6)}
          onReset={() => updateTaskState(6, { water: 0, juice: 0, mors: '', part1Verified: false })}
        >
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100">
              <h4 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                Стаканы воды ({taskStates[6]?.water || 0})
              </h4>
              <div className="flex flex-wrap gap-2 min-h-[64px]">
                {Array.from({ length: 15 }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => updateTaskState(6, { ...taskStates[6], water: i + 1 })}
                    className={`transition-all duration-200 transform hover:scale-110 ${i < (taskStates[6]?.water || 0) ? 'opacity-100' : 'opacity-20 grayscale'}`}
                  >
                    <GlassIcon type="water" className="w-10 h-10 text-blue-500" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-100">
              <h4 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                Стаканы сока ({taskStates[6]?.juice || 0})
              </h4>
              <div className="flex flex-wrap gap-2 min-h-[64px]">
                {Array.from({ length: 15 }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => updateTaskState(6, { ...taskStates[6], juice: i + 1 })}
                    className={`transition-all duration-200 transform hover:scale-110 ${i < (taskStates[6]?.juice || 0) ? 'opacity-100' : 'opacity-20 grayscale'}`}
                  >
                    <GlassIcon type="juice" className="w-10 h-10 text-red-500" />
                  </button>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-400 italic text-center">Нажимай на стаканы, чтобы выбрать их количество</p>

            {/* Part 2: Numeric Input after verification */}
            {taskStates[6]?.part1Verified && (
              <div className="mt-8 pt-8 border-t-2 border-dashed border-blue-200 animate-in fade-in slide-in-from-top-4 duration-500">
                <p className="text-gray-600 text-lg mb-4">
                  Сколько стаканов ягодного морса получится у мадам Розы, если для его приготовления она взяла 9 стаканов сока?
                </p>
                <div className="flex items-center gap-4 bg-blue-50 p-6 rounded-3xl border-2 border-blue-200">
                  <span className="text-xl font-bold text-blue-800 whitespace-nowrap">ЯГОДНЫЙ МОРС:</span>
                  <input
                    type="number"
                    placeholder="?"
                    value={taskStates[6]?.mors || ''}
                    onChange={e => updateTaskState(6, { ...taskStates[6], mors: e.target.value })}
                    className="w-24 p-3 text-center text-2xl font-bold bg-white border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-300"
                  />
                  <span className="text-xl font-bold text-blue-800">стаканов</span>
                </div>
              </div>
            )}
          </div>
        </TaskCard>

        {/* Task 7 */}
        <TaskCard 
          taskNumber={7} 
          description="Чтобы покрасить комнаты, мистер Трудди делает голубую краску, смешивая 1 кг синей и 4 кг белой краски. Сколько килограммов голубой краски получится, если для смешивания взяли 12 кг белой краски?"
          isCorrect={taskFeedback[7]}
          onCheck={() => checkTask(7)}
        >
          <div className="flex items-center gap-4 max-w-xs">
            <input
              type="number"
              placeholder="Результат"
              value={taskStates[7] || ''}
              onChange={e => updateTaskState(7, e.target.value)}
              className="w-full p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
            />
            <span className="text-xl font-bold text-gray-500">кг</span>
          </div>
        </TaskCard>

        {/* Task 8 - Two Part Grid Painting & Drag and Drop */}
        <TaskCard 
          taskNumber={8} 
          description="Чтобы получить краску салатового цвета, мистер Трудди берёт 1 кг белой краски и 2 кг зелёной краски. Закрась ячейки ниже (1 ячейка = 1 кг) и покажи, сколько белой и зелёной краски было использовано для одной порции. Сколько всего салатовой краски получится?"
          isCorrect={taskFeedback[8]}
          onCheck={() => checkTask(8)}
          onReset={() => updateTaskState(8, { white: 0, green: 0, total: '', part1Verified: false, p2_draggedCount: 0, p2_expression: '', p2_finalAnswer: '' })}
        >
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex gap-4">
                  <button 
                    onClick={() => updateTaskState(8, { ...taskStates[8], white: (taskStates[8]?.white || 0) + 1 })}
                    className="bg-gray-100 px-4 py-2 rounded-xl font-bold text-sm hover:bg-gray-200 text-gray-900">+ Белая</button>
                  <button 
                    onClick={() => updateTaskState(8, { ...taskStates[8], green: (taskStates[8]?.green || 0) + 1 })}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-200">+ Зелёная</button>
                </div>
                <div className="flex flex-wrap gap-2 p-6 bg-gray-50 rounded-3xl min-h-[100px] border-2 border-dashed border-gray-200">
                  {Array.from({ length: taskStates[8]?.white || 0 }).map((_, i) => (
                    <div key={`w-${i}`} className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg shadow-sm"></div>
                  ))}
                  {Array.from({ length: taskStates[8]?.green || 0 }).map((_, i) => (
                    <div key={`g-${i}`} className="w-12 h-12 bg-green-400 border-2 border-green-500 rounded-lg shadow-sm"></div>
                  ))}
                </div>
                <p className="text-xs text-gray-500">Добавь кг краски для одной порции</p>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-48">
                <label className="text-gray-500 font-bold">Итого салатовой:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={taskStates[8]?.total || ''}
                    onChange={e => updateTaskState(8, { ...taskStates[8], total: e.target.value })}
                    className="w-full p-4 text-center text-2xl font-bold bg-lime-50 border-2 border-lime-200 rounded-2xl focus:border-lime-500 focus:outline-none text-gray-900 placeholder-gray-400"
                  />
                  <span className="font-bold text-gray-500">кг</span>
                </div>
              </div>
            </div>

            {/* Part 2: Card Drag-and-Drop + Calculation */}
            {taskStates[8]?.part1Verified && (
              <div className="pt-10 border-t-2 border-dashed border-lime-200 animate-in fade-in slide-in-from-top-6 duration-700">
                <p className="text-gray-700 font-bold text-xl mb-6 leading-relaxed">
                  Перенеси карточки, чтобы показать, сколько банок (или сколько раз) по 3 кг салатовой краски нужно взять мистеру Трудди, чтобы получить 12 кг этой краски.<br/>
                  <span className="text-lime-600">12 кг салатовой краски.</span>
                </p>

                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                  {/* Source Pool */}
                  <div className="flex-1 bg-lime-50 p-6 rounded-3xl border-2 border-lime-100">
                    <p className="text-sm font-bold text-lime-700 mb-4 uppercase tracking-wider">Выбери банки по 3 кг</p>
                    <div className="flex flex-wrap gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => updateTaskState(8, { ...taskStates[8], p2_draggedCount: Math.min(6, (taskStates[8]?.p2_draggedCount || 0) + 1) })}
                          className={`w-20 h-24 bg-white border-4 border-lime-400 rounded-2xl flex flex-col items-center justify-center font-black text-lime-600 shadow-md hover:scale-110 transition-transform ${i < (taskStates[8]?.p2_draggedCount || 0) ? 'opacity-30 grayscale pointer-events-none' : ''}`}
                        >
                          <span className="text-2xl">3</span>
                          <span className="text-xs">кг</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Zone */}
                  <div className="flex-1 bg-white p-6 rounded-3xl border-4 border-dashed border-lime-300 min-h-[160px] flex flex-wrap gap-4 items-center justify-center relative overflow-hidden">
                    {taskStates[8]?.p2_draggedCount === 0 && (
                      <span className="text-lime-300 font-bold text-lg animate-pulse">Перенеси сюда (нажми на банки слева)</span>
                    )}
                    {Array.from({ length: taskStates[8]?.p2_draggedCount || 0 }).map((_, i) => (
                      <button
                        key={`target-${i}`}
                        onClick={() => updateTaskState(8, { ...taskStates[8], p2_draggedCount: Math.max(0, (taskStates[8]?.p2_draggedCount || 0) - 1) })}
                        className="w-16 h-20 bg-lime-400 rounded-xl flex flex-col items-center justify-center font-black text-white shadow-lg hover:bg-red-400 hover:scale-95 transition-all group"
                      >
                        <span className="text-xl group-hover:hidden">3</span>
                        <span className="text-xs group-hover:hidden">кг</span>
                        <span className="hidden group-hover:block text-sm">Убрать</span>
                      </button>
                    ))}
                    {taskStates[8]?.p2_draggedCount > 0 && (
                      <div className="absolute bottom-2 right-4 text-lime-600 font-black">
                        Итого: {(taskStates[8]?.p2_draggedCount || 0) * 3} кг
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-8 rounded-[2.5rem] border-2 border-blue-100">
                  <p className="text-gray-700 font-bold text-lg mb-6 leading-relaxed">
                    Составь выражение и найди, сколько ЗЕЛЁНОЙ краски потребуется для получения 12 кг салатовой.
                  </p>
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 w-full">
                      <label className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">Выражение</label>
                      <input
                        type="text"
                        placeholder="Напр: 4 * 2"
                        value={taskStates[8]?.p2_expression || ''}
                        onChange={e => updateTaskState(8, { ...taskStates[8], p2_expression: e.target.value })}
                        className="w-full p-4 text-xl font-bold bg-white border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-300"
                      />
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="text-3xl font-black text-blue-300">=</div>
                      <div className="flex-1 md:w-32">
                        <label className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">Ответ (кг)</label>
                        <input
                          type="number"
                          placeholder="?"
                          value={taskStates[8]?.p2_finalAnswer || ''}
                          onChange={e => updateTaskState(8, { ...taskStates[8], p2_finalAnswer: e.target.value })}
                          className="w-full p-4 text-center text-2xl font-black bg-white border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TaskCard>

        {/* Task 9 */}
        <TaskCard 
          taskNumber={9} 
          description="Чтобы сделать ореховую смесь, Алора берёт 1 кг миндаля и 2 кг фундука. Сколько фундука нужно взять Алоре для изготовления 27 кг ореховой смеси?"
          isCorrect={taskFeedback[9]}
          onCheck={() => checkTask(9)}
        >
          <div className="flex items-center gap-4 max-w-xs">
            <input
              type="number"
              placeholder="Результат"
              value={taskStates[9] || ''}
              onChange={e => updateTaskState(9, e.target.value)}
              className="w-full p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
            />
            <span className="text-xl font-bold text-gray-500">кг</span>
          </div>
        </TaskCard>

        {/* Task 10 */}
        <TaskCard 
          taskNumber={10} 
          description="Дон задумал два однозначных числа, одно из которых на 3 меньше другого. Произведение этих чисел является двузначным числом, у которого число единиц в 4 раза больше числа единиц числа десятков."
          isCorrect={taskFeedback[10]}
          onCheck={() => checkTask(10)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-bold ml-2">Первое число</label>
              <input
                type="number"
                value={taskStates[10]?.v1 || ''}
                onChange={e => updateTaskState(10, { ...taskStates[10], v1: e.target.value })}
                className="p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-bold ml-2">Второе число</label>
              <input
                type="number"
                value={taskStates[10]?.v2 || ''}
                onChange={e => updateTaskState(10, { ...taskStates[10], v2: e.target.value })}
                className="p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
        </TaskCard>

        {/* Task 11 */}
        <TaskCard 
          taskNumber={11} 
          description="Чтобы сделать смесь сухофруктов для компота, мадам Роза берёт 4 кг яблок, 3 кг груш, 1 кг чернослива и 2 кг урюка."
          isCorrect={taskFeedback[11]}
          onCheck={() => checkTask(11)}
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <p className="text-gray-600">Сколько кг смеси получится, если взяли 12 кг урюка?</p>
              <div className="flex items-center gap-4 max-w-xs">
                <input
                  type="number"
                  value={taskStates[11]?.v1 || ''}
                  onChange={e => updateTaskState(11, { ...taskStates[11], v1: e.target.value })}
                  className="w-full p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                />
                <span className="font-bold text-gray-500">кг</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-gray-600">Сколько кг груш нужно, чтобы сделать 50 кг смеси?</p>
              <div className="flex items-center gap-4 max-w-xs">
                <input
                  type="number"
                  value={taskStates[11]?.v2 || ''}
                  onChange={e => updateTaskState(11, { ...taskStates[11], v2: e.target.value })}
                  className="w-full p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                />
                <span className="font-bold text-gray-500">кг</span>
              </div>
            </div>
          </div>
        </TaskCard>

        {/* Task 12 */}
        <TaskCard 
          taskNumber={12} 
          description="Чтобы сделать смесь орехов, берут 3 кг миндаля, 3 кг фундука и 6 кг грецких орехов."
          isCorrect={taskFeedback[12]}
          onCheck={() => checkTask(12)}
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <p className="text-gray-600">Сколько кг миндаля нужно для 4 кг смеси?</p>
              <div className="flex items-center gap-4 max-w-xs">
                <input
                  type="number"
                  value={taskStates[12]?.v1 || ''}
                  onChange={e => updateTaskState(12, { ...taskStates[12], v1: e.target.value })}
                  className="w-full p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                />
                <span className="font-bold text-gray-500">кг</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-gray-600">Сколько кг смеси получится из 8 кг грецких орехов?</p>
              <div className="flex items-center gap-4 max-w-xs">
                <input
                  type="number"
                  value={taskStates[12]?.v2 || ''}
                  onChange={e => updateTaskState(12, { ...taskStates[12], v2: e.target.value })}
                  className="w-full p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                />
                <span className="font-bold text-gray-500">кг</span>
              </div>
            </div>
          </div>
        </TaskCard>

        {/* Task 13 */}
        <TaskCard 
          taskNumber={13} 
          description="Квент задумал два однозначных числа, одно из которых на 5 больше другого. Произведение этих чисел — двузначное число, у которого число десятков в 2 раза меньше числа единиц. Найди оба варианта."
          isCorrect={taskFeedback[13]}
          onCheck={() => checkTask(13)}
        >
          <div className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
              <h4 className="text-blue-800 font-bold mb-4 uppercase text-xs tracking-widest">Первая пара чисел</h4>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="X1"
                  value={taskStates[13]?.r1v1 || ''}
                  onChange={e => updateTaskState(13, { ...taskStates[13], r1v1: e.target.value })}
                  className="p-4 text-center text-2xl font-bold bg-white border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                />
                <input
                  type="number"
                  placeholder="Y1"
                  value={taskStates[13]?.r1v2 || ''}
                  onChange={e => updateTaskState(13, { ...taskStates[13], r1v2: e.target.value })}
                  className="p-4 text-center text-2xl font-bold bg-white border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
              <h4 className="text-purple-800 font-bold mb-4 uppercase text-xs tracking-widest">Вторая пара чисел</h4>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="X2"
                  value={taskStates[13]?.r2v1 || ''}
                  onChange={e => updateTaskState(13, { ...taskStates[13], r2v1: e.target.value })}
                  className="p-4 text-center text-2xl font-bold bg-white border-2 border-purple-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                />
                <input
                  type="number"
                  placeholder="Y2"
                  value={taskStates[13]?.r2v2 || ''}
                  onChange={e => updateTaskState(13, { ...taskStates[13], r2v2: e.target.value })}
                  className="p-4 text-center text-2xl font-bold bg-white border-2 border-purple-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </TaskCard>

        {/* Task 14 */}
        <TaskCard 
          taskNumber={14} 
          description="Для овощного салата Оливия берёт 6 кг огурцов, 4 кг помидоров, 2 кг моркови и 2 кг лука."
          isCorrect={taskFeedback[14]}
          onCheck={() => checkTask(14)}
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <p className="text-gray-600">Сколько кг салата получится из 5 кг моркови?</p>
              <div className="flex items-center gap-4 max-w-xs">
                <input
                  type="number"
                  value={taskStates[14]?.v1 || ''}
                  onChange={e => updateTaskState(14, { ...taskStates[14], v1: e.target.value })}
                  className="w-full p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                />
                <span className="font-bold text-gray-500">кг</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-gray-600">Сколько кг огурцов нужно для 21 кг салата?</p>
              <div className="flex items-center gap-4 max-w-xs">
                <input
                  type="number"
                  value={taskStates[14]?.v2 || ''}
                  onChange={e => updateTaskState(14, { ...taskStates[14], v2: e.target.value })}
                  className="w-full p-4 text-center text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                />
                <span className="font-bold text-gray-500">кг</span>
              </div>
            </div>
          </div>
        </TaskCard>
      </div>

      {progress === totalTasks && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-xl p-12 rounded-[4rem] shadow-2xl border-4 border-yellow-400 text-center animate-bounce pointer-events-auto">
            <h2 className="text-6xl font-black text-blue-900 mb-4">ПОЗДРАВЛЯЕМ! 🏆</h2>
            <p className="text-2xl font-bold text-blue-600">Ты решил все задачи без ошибок!</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-8 px-8 py-4 bg-yellow-400 text-yellow-900 font-black rounded-3xl hover:bg-yellow-500 transition-colors"
            >
              Начать заново
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
