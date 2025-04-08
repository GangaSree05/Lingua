export const drawHand = (predictions, ctx) => {
    if (!predictions.length) return;
  
    const FINGER_CONNECTIONS = {
      thumb: [0, 1, 2, 3, 4],
      index: [0, 5, 6, 7, 8],
      middle: [0, 9, 10, 11, 12],
      ring: [0, 13, 14, 15, 16],
      pinky: [0, 17, 18, 19, 20]
    };
  
    const FINGER_COLORS = {
      thumb: '#FF0000',
      index: '#00FF00',
      middle: '#0000FF',
      ring: '#FFFF00',
      pinky: '#FF00FF'
    };
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const landmarks = predictions[0].landmarks;
  
    // Draw connections
    Object.entries(FINGER_CONNECTIONS).forEach(([finger, joints]) => {
      ctx.strokeStyle = FINGER_COLORS[finger];
      ctx.lineWidth = 3;
      
      for (let i = 0; i < joints.length - 1; i++) {
        const start = landmarks[joints[i]];
        const end = landmarks[joints[i + 1]];
        
        ctx.beginPath();
        ctx.moveTo(start[0], start[1]);
        ctx.lineTo(end[0], end[1]);
        ctx.stroke();
      }
    });
  
    // Draw landmarks
    landmarks.forEach((landmark, i) => {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(landmark[0], landmark[1], 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  };