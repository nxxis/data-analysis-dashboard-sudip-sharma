// ==========================================
// 🔧 WEEK 2: UploadProgressSimulator.tsx
// ==========================================
// This is a template for your Week 2 progress component!
// Follow your student guide to complete this component.

import { useState } from 'react';

const UploadProgressSimulator = () => {
  // 🧠 State variables - your component's memory
  const [progress, setProgress] = useState(0);        // Tracks progress percentage (0-100)
  const [isUploading, setIsUploading] = useState(false); // Tracks if upload is in progress

  // 🔄 Event handler functions - what happens when buttons are clicked
  const startUpload = () => {
    setIsUploading(true);
    setProgress(0);

    // Simulate upload progress with intervals
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + Math.random() * 15 + 5; // Random chunks

        // Complete upload when we reach 100%
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }

        return newProgress;
      });
    }, 300); // Update every 300ms for smooth animation
  };

  const resetProgress = () => {
    setProgress(0);
    setIsUploading(false);
  };

  const addProgress = () => {
    //TODO: Add 25% to current progress
    // Add 25% to current progress, clamp at 100
    setProgress(prev => {
      const next = Math.min(prev + 25, 100);
      if (next >= 100) setIsUploading(false);
      return next;
    });
  };

  return (
    <div className="progress-container p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Week 2 Progression</h2>
      {/* 📊 Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ease-out"
            //style - {{width: '${progress%'}}}  <-- previous, needed to add the Math Class
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* 📈 Progress Display */}
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-blue-600">{Math.round(progress)}%</span>
        <div className="text-sm text-gray-600 mt-2">
          {/*TODO:Add status messages based on progress and upload state */}
          {progress === 0 && !isUploading && 'Ready to start!'}
          {isUploading && progress > 0 && progress < 100 && 'Uploading...'}
          {progress >= 100 && 'Upload complete!'}
        </div>
      </div>

      {/* 🎮 Control Buttons */}
      <div className="flex justify-center gap-3">
        <button 
          onClick={startUpload}
          //disabled = {isUploading || progress === 100}  <-- previous, needed to add the Math Class
          disabled={isUploading || Math.round(progress) === 100}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {isUploading ? 'Uploading...' : 'Start Upload'}
        </button>

        <button 
          onClick={addProgress}
          //disabled = {isUploading || progress >= 100} <-- previous, needed to add the Math Class
          disabled={isUploading || Math.round(progress) >= 100}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-gray-400"
        >
          +25%
        </button>

        <button 
          onClick={resetProgress}
          disabled={isUploading}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {/* 🎉 Fun progress messages */}
      <div className="text-center mt-4 text-sm text-gray-600">
        {/* TODO: Add different messages based on progress value */}
        {/* HINT: Use conditional rendering like: */}
        {/* {progress === 0 && "Ready to start!"} */}
        {/* {progress > 50 && "More than halfway there!"} */}
      </div>
    </div>
  );
};

export default UploadProgressSimulator;

// 📝 NEXT STEPS:
// 1. Complete the TODO sections following your student guide
// 2. Import this component in src/pages/Index.tsx
// 3. Add it where the Week 2 comments indicate
// 4. Test your component by clicking the buttons!
