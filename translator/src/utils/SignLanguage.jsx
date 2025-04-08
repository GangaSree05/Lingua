import React, { useRef, useState, useEffect } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';
import '@tensorflow/tfjs-backend-webgl';

import { aslGestures } from './aslGestures';

function SignLanguage({ onResult, onClose, selectedLanguage }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const [detectedText, setDetectedText] = useState('');
  const [collectedSigns, setCollectedSigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const detectionInterval = useRef(null);
  const lastDetectionTime = useRef(0);

  // Load model and setup camera
  useEffect(() => {
    const loadModelAndCamera = async () => {
      try {
        setIsLoading(true);
        await tf.setBackend('webgl');
        const net = await handpose.load();
        setModel(net);
        
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: 1280, 
            height: 720, 
            facingMode: 'user',
            frameRate: { ideal: 60 }
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await new Promise((resolve) => {
            videoRef.current.onloadedmetadata = resolve;
          });
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Initialization error:", err);
        setError("Could not access camera or load model. Please check permissions.");
      } finally {
        setIsLoading(false);
      }
    };

    loadModelAndCamera();

    return () => {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
      stopVideo();
    };
  }, []);

  // Detection loop
  useEffect(() => {
    if (!model || !isDetecting || isLoading) return;

    const detect = async () => {
      try {
        const predictions = await model.estimateHands(videoRef.current, true);
        
        if (predictions.length > 0) {
          const GE = new fp.GestureEstimator(aslGestures);
          const gesture = await GE.estimate(predictions[0].landmarks, 8);
          
          if (gesture.gestures?.length > 0) {
            const confidence = gesture.gestures.map(p => p.score);
            const maxConfidence = confidence.indexOf(Math.max(...confidence));
            
            if (gesture.gestures[maxConfidence].score > 0.9) {
              const detected = gesture.gestures[maxConfidence].name;
              const currentTime = Date.now();
              
              if (detected !== detectedText || currentTime - lastDetectionTime.current > 1000) {
                setDetectedText(detected);
                lastDetectionTime.current = currentTime;
                
                setCollectedSigns(prev => [
                  ...prev,
                  detected.length > 1 ? ` ${detected} ` : detected
                ]);
              }
            }
          }
        }
      } catch (err) {
        console.error("Detection error:", err);
      }
    };

    detectionInterval.current = setInterval(detect, 300);
    return () => clearInterval(detectionInterval.current);
  }, [model, isDetecting, detectedText, isLoading]);

  const stopVideo = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const translateCollectedSentence = async () => {
    setIsLoading(true);
    try {
      const sentence = collectedSigns.join('').trim().replace(/\s+/g, ' ');
      if (sentence) {
        const targetLangCode = LANGUAGES[selectedLanguage] || 'en';
        const res = await axios.post('https://libretranslate.de/translate', {
          q: sentence,
          source: 'en',
          target: targetLangCode,
          format: 'text'
        }, {
          headers: { 'accept': 'application/json' }
        });
        onResult(res.data.translatedText);
      }
    } catch (err) {
      console.error("Translation error:", err);
      onResult(collectedSigns.join(''));
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const clearCollected = () => {
    setCollectedSigns([]);
    setDetectedText('');
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <h3 className="text-xl font-bold text-red-600 mb-4">Error</h3>
          <p className="mb-4">{error}</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-indigo-700">Sign Language Translator</h3>
          <button 
            onClick={() => {
              setIsDetecting(false);
              stopVideo();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
            <p>Loading sign language detection...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
                <video 
                  ref={videoRef} 
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                  muted
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
                {detectedText && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-center py-2">
                    Detected: <span className="font-bold">{detectedText}</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-gray-700">Translation Progress</h4>
                <div className="bg-white p-4 rounded border border-gray-200 min-h-32">
                  {collectedSigns.length > 0 ? (
                    <p className="text-lg font-mono break-all">
                      {collectedSigns.join('')}
                    </p>
                  ) : (
                    <p className="text-gray-400 italic">Sign letters or words to build your sentence</p>
                  )}
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>{collectedSigns.length} signs collected</span>
                  <button 
                    onClick={clearCollected}
                    className="text-red-500 hover:text-red-700"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => setIsDetecting(!isDetecting)} 
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  isDetecting 
                    ? 'bg-yellow-500 hover:bg-yellow-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white transition-colors`}
              >
                {isDetecting ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Pause Detection
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Resume Detection
                  </>
                )}
              </button>
              
              <button 
                onClick={translateCollectedSentence}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center gap-2 transition-colors"
                disabled={collectedSigns.length === 0 || isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                </svg>
                Translate Sentence
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const LANGUAGES = {
  English: 'en',
  Spanish: 'es',
  German: 'de',
  French: 'fr',
  Hindi: 'hi',
  Tamil: 'ta',
  Japanese: 'ja',
  Chinese: 'zh',
  Korean: 'ko',
  Russian: 'ru',
  Arabic: 'ar',
  Italian: 'it',
  Portuguese: 'pt',
  Dutch: 'nl',
  Turkish: 'tr',
  Bengali: 'bn',
  Urdu: 'ur',
  Greek: 'el',
  Thai: 'th',
  Vietnamese: 'vi',
};

export default SignLanguage;