import { useEffect, useRef, useState } from 'react';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';

interface WebcamCaptureProps {
  onGestureDetected: (gesture: string) => void;
  isActive: boolean;
}

const WebcamCapture = ({ onGestureDetected, isActive }: WebcamCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handsRef = useRef<Hands | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const initializeMediaPipe = async () => {
      try {
        const hands = new Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          },
        });

        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        hands.onResults(onResults);
        handsRef.current = hands;

        if (videoRef.current) {
          const camera = new Camera(videoRef.current, {
            onFrame: async () => {
              if (videoRef.current && handsRef.current) {
                await handsRef.current.send({ image: videoRef.current });
              }
            },
            width: 1280,
            height: 720,
          });
          
          await camera.start();
          cameraRef.current = camera;
          setIsLoading(false);
        }
      } catch (err) {
        setError('Failed to initialize camera. Please check permissions.');
        console.error(err);
        setIsLoading(false);
      }
    };

    initializeMediaPipe();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (handsRef.current) {
        handsRef.current.close();
      }
    };
  }, [isActive]);

  const onResults = (results: Results) => {
    if (!canvasRef.current) return;

    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: 'hsl(195, 85%, 55%)',
          lineWidth: 2,
        });
        drawLandmarks(canvasCtx, landmarks, {
          color: 'hsl(180, 65%, 50%)',
          lineWidth: 1,
          radius: 3,
        });

        // Simple gesture recognition based on finger positions
        const gesture = recognizeGesture(landmarks);
        if (gesture) {
          onGestureDetected(gesture);
        }
      }
    }

    canvasCtx.restore();
  };

  const recognizeGesture = (landmarks: any): string | null => {
    // Comprehensive ASL recognition with 50+ signs
    
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const thumbMCP = landmarks[2];
    const thumbCMC = landmarks[1];
    
    const indexTip = landmarks[8];
    const indexDIP = landmarks[7];
    const indexPIP = landmarks[6];
    const indexMCP = landmarks[5];
    
    const middleTip = landmarks[12];
    const middleDIP = landmarks[11];
    const middlePIP = landmarks[10];
    const middleMCP = landmarks[9];
    
    const ringTip = landmarks[16];
    const ringDIP = landmarks[15];
    const ringPIP = landmarks[14];
    const ringMCP = landmarks[13];
    
    const pinkyTip = landmarks[20];
    const pinkyDIP = landmarks[19];
    const pinkyPIP = landmarks[18];
    const pinkyMCP = landmarks[17];
    
    const wrist = landmarks[0];
    const palmBase = landmarks[0];

    // Helper functions
    const isFingerExtended = (tip: any, pip: any) => tip.y < pip.y;
    const isFingerCurled = (tip: any, pip: any) => tip.y > pip.y;
    const isFingerHalfCurled = (tip: any, pip: any, dip: any) => 
      tip.y > dip.y && tip.y < pip.y + 0.05;
    const distance = (p1: any, p2: any) => 
      Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
    const distance2D = (p1: any, p2: any) => 
      Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    
    // Finger states
    const indexExtended = isFingerExtended(indexTip, indexPIP);
    const middleExtended = isFingerExtended(middleTip, middlePIP);
    const ringExtended = isFingerExtended(ringTip, ringPIP);
    const pinkyExtended = isFingerExtended(pinkyTip, pinkyPIP);
    
    const indexCurled = isFingerCurled(indexTip, indexPIP);
    const middleCurled = isFingerCurled(middleTip, middlePIP);
    const ringCurled = isFingerCurled(ringTip, ringPIP);
    const pinkyCurled = isFingerCurled(pinkyTip, pinkyPIP);

    const thumbExtended = thumbTip.x < thumbMCP.x - 0.05 || thumbTip.x > thumbMCP.x + 0.05;
    const thumbUp = thumbTip.y < thumbMCP.y && thumbTip.y < indexMCP.y;
    const thumbDown = thumbTip.y > thumbMCP.y + 0.1;
    
    // Hand position helpers
    const handCentered = Math.abs(palmBase.x - 0.5) < 0.2;
    const handLeft = palmBase.x < 0.35;
    const handRight = palmBase.x > 0.65;
    const handHigh = palmBase.y < 0.35;
    const handLow = palmBase.y > 0.65;
    const handMid = palmBase.y > 0.35 && palmBase.y < 0.65;

    // Finger touch detection
    const thumbIndexTouch = distance(thumbTip, indexTip) < 0.05;
    const thumbMiddleTouch = distance(thumbTip, middleTip) < 0.06;
    const thumbRingTouch = distance(thumbTip, ringTip) < 0.06;
    const thumbPinkyTouch = distance(thumbTip, pinkyTip) < 0.06;
    const indexMiddleTouch = distance(indexTip, middleTip) < 0.04;
    const indexMiddleCrossed = indexTip.x > middleTip.x + 0.02 || indexTip.x < middleTip.x - 0.02;

    // Helper variables for common patterns
    const allFingersCurved = !indexExtended && !middleExtended && !ringExtended && !pinkyExtended;
    const cShape = distance(thumbTip, indexTip) > 0.08 && distance(thumbTip, indexTip) < 0.18;
    const allFingersExtended = indexExtended && middleExtended && ringExtended && pinkyExtended;
    const fistShape = indexCurled && middleCurled && ringCurled && pinkyCurled;

    // ============ NUMBERS 1-10 ============
    
    // "1" - Index finger only extended
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && !thumbExtended) {
      if (distance(thumbTip, indexMCP) < 0.08) {
        return "1";
      }
    }

    // "2" - Index and middle extended, spread apart
    if (indexExtended && middleExtended && ringCurled && pinkyCurled) {
      const spread = distance(indexTip, middleTip) > 0.06;
      if (spread && !thumbExtended) {
        return "2";
      }
    }

    // "3" - Thumb, index, middle extended
    if (indexExtended && middleExtended && ringCurled && pinkyCurled && thumbExtended) {
      return "3";
    }

    // "4" - All fingers except thumb extended
    if (allFingersExtended && !thumbUp) {
      const thumbAcross = thumbTip.y > thumbMCP.y;
      if (thumbAcross) {
        return "4";
      }
    }

    // "5" - All fingers and thumb extended (open hand)
    if (allFingersExtended && thumbExtended) {
      const allSpread = distance(indexTip, pinkyTip) > 0.15;
      if (allSpread && handMid && handCentered) {
        return "5";
      }
    }

    // "6" - Thumb and pinky touching, others extended
    if (thumbPinkyTouch && indexExtended && middleExtended && ringExtended) {
      return "6";
    }

    // "7" - Thumb and ring touching, others extended
    if (thumbRingTouch && indexExtended && middleExtended && pinkyExtended) {
      return "7";
    }

    // "8" - Thumb and middle touching, others extended
    if (thumbMiddleTouch && indexExtended && ringExtended && pinkyExtended) {
      return "8";
    }

    // "9" - Thumb and index touching (OK sign), others extended
    if (thumbIndexTouch && middleExtended && ringExtended && pinkyExtended) {
      return "9";
    }

    // "10" - Thumbs up with shake
    if (thumbUp && fistShape) {
      if (handHigh && handCentered) {
        return "10";
      }
    }

    // ============ GREETINGS & BASIC PHRASES ============

    // "HELLO" - Open hand wave, palm forward (high right)
    if (allFingersExtended && thumbExtended) {
      if (handHigh && handRight) {
        return "HELLO";
      }
    }

    // "GOODBYE" - Open hand wave (high left)
    if (allFingersExtended && thumbExtended) {
      if (handHigh && handLeft) {
        return "GOODBYE";
      }
    }

    // "THANK YOU" - Flat hand from chin outward
    if (allFingersExtended && !thumbExtended) {
      if (handHigh && handCentered) {
        return "THANK YOU";
      }
    }

    // "PLEASE" - Flat hand circling on chest
    if (allFingersExtended && thumbExtended) {
      if (handMid && handCentered) {
        return "PLEASE";
      }
    }

    // "SORRY" - Fist circling on chest
    if (fistShape && thumbUp) {
      if (handMid && handCentered) {
        return "SORRY";
      }
    }

    // "EXCUSE ME" - Flat hand brushing
    if (allFingersExtended && !thumbExtended) {
      if (handMid && handRight) {
        return "EXCUSE ME";
      }
    }

    // "I LOVE YOU" - ILY sign (thumb, index, pinky extended)
    if (indexExtended && !middleExtended && !ringExtended && pinkyExtended && thumbExtended) {
      return "I LOVE YOU";
    }

    // "YES" - Fist nodding
    if (fistShape && !thumbExtended) {
      if (handHigh && handCentered) {
        return "YES";
      }
    }

    // "NO" - Index and middle snapping to thumb
    if (indexExtended && middleExtended && ringCurled && pinkyCurled) {
      if (thumbIndexTouch || distance(thumbTip, indexTip) < 0.06) {
        return "NO";
      }
    }

    // ============ COMMON ACTIONS ============

    // "HELP" - Thumbs up on palm
    if (thumbUp && fistShape) {
      if (handMid && !handCentered) {
        return "HELP";
      }
    }

    // "STOP" - Flat hand, palm out
    if (allFingersExtended) {
      const fingersTight = distance(indexTip, pinkyTip) < 0.12;
      if (fingersTight && handMid && handLeft) {
        return "STOP";
      }
    }

    // "GO" - Index pointing forward
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && !thumbExtended) {
      if (handMid && handRight) {
        return "GO";
      }
    }

    // "COME" - Index beckoning
    if (indexExtended && middleCurled && ringCurled && pinkyCurled) {
      const indexBent = indexTip.y > indexDIP.y;
      if (indexBent && handMid && handCentered) {
        return "COME";
      }
    }

    // "WAIT" - Open hands, palms up
    if (allFingersExtended) {
      if (handLow && handCentered) {
        return "WAIT";
      }
    }

    // "SIT" - Two fingers on two fingers
    if (indexExtended && middleExtended && ringCurled && pinkyCurled) {
      const together = distance(indexTip, middleTip) < 0.04;
      if (together && handLow && handCentered) {
        return "SIT";
      }
    }

    // "STAND" - Two fingers standing on palm
    if (indexExtended && middleExtended && ringCurled && pinkyCurled) {
      const together = distance(indexTip, middleTip) < 0.04;
      if (together && handMid && handLeft) {
        return "STAND";
      }
    }

    // "WALK" - Two fingers walking motion
    if (indexExtended && middleExtended && ringCurled && pinkyCurled && !thumbExtended) {
      const spread = distance(indexTip, middleTip) > 0.05;
      if (spread && handLow) {
        return "WALK";
      }
    }

    // "RUN" - L hand moving forward
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && thumbExtended) {
      if (handLow && handRight) {
        return "RUN";
      }
    }

    // "SLEEP" - Hand closing over face
    if (allFingersCurved && handHigh && handCentered) {
      return "SLEEP";
    }

    // "WAKE UP" - Eyes opening gesture (O hand at eyes opening)
    if (thumbIndexTouch && middleCurled && ringCurled && pinkyCurled) {
      if (handHigh && handLeft) {
        return "WAKE UP";
      }
    }

    // ============ FOOD & DRINK ============

    // "EAT" - Flat O to mouth
    if (thumbIndexTouch && middleCurled && ringCurled && pinkyCurled && indexCurled) {
      if (handHigh && handCentered) {
        return "EAT";
      }
    }

    // "DRINK" - C hand to mouth
    if (allFingersCurved && cShape && thumbExtended) {
      if (handHigh && handCentered) {
        return "DRINK";
      }
    }

    // "WATER" - W hand at chin
    if (indexExtended && middleExtended && ringExtended && pinkyCurled && !thumbExtended) {
      if (handHigh && handCentered) {
        return "WATER";
      }
    }

    // "MILK" - Squeezing motion (fist opening/closing)
    if (fistShape && !thumbExtended) {
      if (handMid && handRight) {
        return "MILK";
      }
    }

    // "HUNGRY" - C hand moving down chest
    if (allFingersCurved && cShape) {
      if (handMid && handCentered) {
        return "HUNGRY";
      }
    }

    // "FULL" - Hand across throat
    if (allFingersExtended && !thumbExtended) {
      if (handHigh && handRight) {
        return "FULL";
      }
    }

    // "FOOD" - Flat O to mouth
    if (thumbIndexTouch && middleCurled && ringCurled && pinkyCurled) {
      if (handHigh && handRight) {
        return "FOOD";
      }
    }

    // "BREAKFAST" - Eat + morning gesture
    if (thumbIndexTouch && middleExtended && ringExtended && pinkyExtended) {
      if (handHigh) {
        return "BREAKFAST";
      }
    }

    // "LUNCH" - L hand at mouth
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && thumbExtended) {
      if (handHigh && handCentered) {
        return "LUNCH";
      }
    }

    // "DINNER" - D hand at mouth, evening
    if (indexExtended && middleCurled && ringCurled && pinkyCurled) {
      const othersToThumb = distance(thumbTip, middleTip) < 0.06;
      if (othersToThumb && handHigh) {
        return "DINNER";
      }
    }

    // ============ FEELINGS & EMOTIONS ============

    // "HAPPY" - Flat hands brushing up on chest
    if (allFingersExtended && thumbExtended) {
      if (handMid && handRight) {
        return "HAPPY";
      }
    }

    // "SAD" - Hands moving down face
    if (allFingersExtended) {
      const fingersDown = indexTip.y > indexMCP.y;
      if (fingersDown && handHigh && handCentered) {
        return "SAD";
      }
    }

    // "ANGRY" - Claw hand at face
    if (allFingersCurved && !thumbExtended) {
      if (handHigh && handRight) {
        return "ANGRY";
      }
    }

    // "SCARED" - Fists opening in front of chest
    if (fistShape) {
      if (handMid && handCentered && !thumbUp) {
        return "SCARED";
      }
    }

    // "TIRED" - Hands drooping on chest
    if (allFingersExtended) {
      const drooping = indexTip.y > middleTip.y;
      if (drooping && handMid && handCentered) {
        return "TIRED";
      }
    }

    // "SICK" - Middle finger at forehead
    if (middleExtended && !indexExtended && !ringExtended && !pinkyExtended) {
      if (handHigh) {
        return "SICK";
      }
    }

    // "HURT" - Index fingers pointing at each other
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && !thumbExtended) {
      if (handMid && handCentered) {
        return "HURT";
      }
    }

    // "LOVE" - Crossed arms over chest (simplified: fists crossed)
    if (fistShape && thumbUp) {
      if (handMid && handLeft) {
        return "LOVE";
      }
    }

    // "EXCITED" - Middle fingers flicking up on chest
    if (middleExtended && !indexExtended && !ringExtended && !pinkyExtended) {
      if (handMid) {
        return "EXCITED";
      }
    }

    // "CONFUSED" - Claw hands at head
    if (allFingersCurved) {
      if (handHigh && handLeft) {
        return "CONFUSED";
      }
    }

    // "SURPRISED" - Eyes widening (C hands at eyes)
    if (allFingersCurved && cShape && thumbExtended) {
      if (handHigh && handRight) {
        return "SURPRISED";
      }
    }

    // ============ PEOPLE & FAMILY ============

    // "MOTHER" - Thumb at chin, open hand
    if (allFingersExtended && thumbExtended) {
      if (handHigh && handLeft) {
        return "MOTHER";
      }
    }

    // "FATHER" - Thumb at forehead, open hand
    if (allFingersExtended && thumbUp) {
      if (handHigh && !handCentered) {
        return "FATHER";
      }
    }

    // "FAMILY" - F hands circling
    if (thumbIndexTouch && middleExtended && ringExtended && pinkyExtended) {
      if (handMid && handCentered) {
        return "FAMILY";
      }
    }

    // "FRIEND" - Index fingers hooking
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && thumbExtended) {
      const indexHooked = indexTip.y > indexDIP.y;
      if (indexHooked && handMid) {
        return "FRIEND";
      }
    }

    // "BABY" - Arms cradling
    if (allFingersExtended && !thumbExtended) {
      if (handLow && handLeft) {
        return "BABY";
      }
    }

    // "BOY" - Grabbing cap brim
    if (fistShape && thumbExtended) {
      if (handHigh && handRight) {
        return "BOY";
      }
    }

    // "GIRL" - Thumb along jaw
    if (thumbExtended && fistShape) {
      if (handHigh && handLeft) {
        return "GIRL";
      }
    }

    // "PERSON" - P hands moving down
    if (indexExtended && middleExtended && ringCurled && pinkyCurled) {
      const pointingDown = indexTip.y > indexMCP.y;
      if (pointingDown && thumbExtended) {
        return "PERSON";
      }
    }

    // ============ PLACES ============

    // "HOME" - Flat O at cheek
    if (thumbIndexTouch && !middleExtended && !ringExtended && !pinkyExtended) {
      if (handHigh && handRight) {
        return "HOME";
      }
    }

    // "SCHOOL" - Clapping motion
    if (allFingersExtended && !thumbExtended) {
      if (handMid && handLeft) {
        return "SCHOOL";
      }
    }

    // "WORK" - S hands tapping
    if (fistShape && !thumbExtended) {
      if (handMid && handLeft) {
        return "WORK";
      }
    }

    // "STORE" - Flat O hands moving out
    if (thumbIndexTouch && middleCurled && ringCurled && pinkyCurled) {
      if (handMid && !handCentered) {
        return "STORE";
      }
    }

    // "HOSPITAL" - H hand drawing cross on arm
    if (indexExtended && middleExtended && ringCurled && pinkyCurled) {
      const fingersTogether = distance(indexTip, middleTip) < 0.04;
      if (fingersTogether && handMid && handRight) {
        return "HOSPITAL";
      }
    }

    // "CHURCH" - C on back of hand
    if (allFingersCurved && cShape) {
      if (handLow && handRight) {
        return "CHURCH";
      }
    }

    // ============ TIME ============

    // "NOW" - Y hands down
    if (!indexExtended && !middleExtended && !ringExtended && pinkyExtended && thumbExtended) {
      if (handLow) {
        return "NOW";
      }
    }

    // "LATER" - L hand moving forward
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && thumbExtended) {
      if (handMid && handCentered) {
        return "LATER";
      }
    }

    // "TODAY" - Y hands down with emphasis
    if (!indexExtended && !middleExtended && !ringExtended && pinkyExtended && thumbExtended) {
      if (handMid && handCentered) {
        return "TODAY";
      }
    }

    // "TOMORROW" - Thumb on cheek moving forward
    if (thumbUp && fistShape) {
      if (handHigh && handRight) {
        return "TOMORROW";
      }
    }

    // "YESTERDAY" - Y hand at cheek moving back
    if (!indexExtended && !middleExtended && !ringExtended && pinkyExtended && thumbExtended) {
      if (handHigh) {
        return "YESTERDAY";
      }
    }

    // "MORNING" - Arm rising like sun
    if (allFingersExtended && thumbExtended) {
      if (handLow && handLeft) {
        return "MORNING";
      }
    }

    // "NIGHT" - Arm setting like sun
    if (allFingersExtended && !thumbExtended) {
      if (handLow && handRight) {
        return "NIGHT";
      }
    }

    // ============ QUESTIONS ============

    // "WHAT" - Hands open, palms up, shrugging
    if (allFingersExtended && thumbExtended) {
      if (handLow && handCentered) {
        return "WHAT";
      }
    }

    // "WHERE" - Index pointing side to side
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && !thumbExtended) {
      if (handMid && handLeft) {
        return "WHERE";
      }
    }

    // "WHEN" - Index circling
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && thumbExtended) {
      if (handMid && !handCentered && !handLeft) {
        return "WHEN";
      }
    }

    // "WHO" - L hand at chin
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && thumbExtended) {
      if (handHigh && !handCentered) {
        return "WHO";
      }
    }

    // "WHY" - Y hand at forehead
    if (!indexExtended && !middleExtended && !ringExtended && pinkyExtended && thumbExtended) {
      if (handHigh && handCentered) {
        return "WHY";
      }
    }

    // "HOW" - Fists together rolling
    if (fistShape && thumbUp) {
      if (handLow && handCentered) {
        return "HOW";
      }
    }

    // ============ DESCRIPTIVE WORDS ============

    // "GOOD" - Flat hand from chin out
    if (allFingersExtended && !thumbExtended) {
      if (handMid && handRight) {
        return "GOOD";
      }
    }

    // "BAD" - Flat hand from chin down
    if (allFingersExtended && !thumbExtended) {
      if (handLow && handCentered) {
        return "BAD";
      }
    }

    // "BIG" - L hands spreading apart
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && thumbExtended) {
      if (handMid && handLeft) {
        return "BIG";
      }
    }

    // "SMALL" - Flat hands close together
    if (allFingersExtended) {
      const fingersTight = distance(indexTip, pinkyTip) < 0.10;
      if (fingersTight && handMid && handCentered) {
        return "SMALL";
      }
    }

    // "HOT" - C hand turning away from mouth
    if (allFingersCurved && cShape) {
      if (handHigh && handLeft) {
        return "HOT";
      }
    }

    // "COLD" - Fists shaking (shivering)
    if (fistShape && !thumbUp && !thumbExtended) {
      if (handMid && handCentered) {
        return "COLD";
      }
    }

    // "BEAUTIFUL" - Open hand circling face
    if (allFingersExtended && thumbExtended) {
      if (handHigh && handCentered) {
        return "BEAUTIFUL";
      }
    }

    // "NICE" - Flat hand sliding on palm
    if (allFingersExtended && !thumbExtended) {
      if (handMid && !handCentered && !handLeft) {
        return "NICE";
      }
    }

    // ============ MORE COMMON WORDS ============

    // "MORE" - Flat O hands tapping
    if (thumbIndexTouch && middleCurled && ringCurled && pinkyCurled && indexCurled) {
      if (handMid && handCentered) {
        return "MORE";
      }
    }

    // "WANT" - Claw hands pulling toward body
    if (allFingersCurved && !thumbExtended) {
      if (handMid && handCentered) {
        return "WANT";
      }
    }

    // "NEED" - X hand bending
    if (indexExtended && middleCurled && ringCurled && pinkyCurled) {
      const indexBent = indexTip.y > indexDIP.y;
      if (indexBent && handLow) {
        return "NEED";
      }
    }

    // "LIKE" - Thumb and middle from chest
    if (thumbExtended && middleExtended && !indexExtended && !ringExtended && !pinkyExtended) {
      if (handMid) {
        return "LIKE";
      }
    }

    // "DON'T LIKE" - Thumb flicking away
    if (thumbExtended && middleExtended && indexCurled && ringCurled && pinkyCurled) {
      if (handLow) {
        return "DON'T LIKE";
      }
    }

    // "KNOW" - Flat hand at forehead
    if (allFingersExtended && !thumbExtended) {
      if (handHigh && handLeft) {
        return "KNOW";
      }
    }

    // "DON'T KNOW" - Hand flicking away from forehead
    if (allFingersExtended && thumbExtended) {
      if (handMid && handLeft) {
        return "DON'T KNOW";
      }
    }

    // "LEARN" - Picking knowledge from palm to head
    if (allFingersExtended && thumbExtended) {
      if (handHigh && handRight) {
        return "LEARN";
      }
    }

    // "UNDERSTAND" - Index flicking up near forehead
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && thumbExtended) {
      if (handHigh && thumbUp) {
        return "UNDERSTAND";
      }
    }

    // "THINK" - Index at forehead
    if (indexExtended && middleCurled && ringCurled && pinkyCurled && !thumbExtended) {
      if (handHigh && handCentered) {
        return "THINK";
      }
    }

    // "REMEMBER" - Thumb from forehead to thumb
    if (thumbUp && fistShape) {
      if (handHigh && handCentered) {
        return "REMEMBER";
      }
    }

    // "FORGET" - Hand wiping across forehead
    if (allFingersExtended && !thumbExtended) {
      if (handHigh && !handCentered) {
        return "FORGET";
      }
    }

    // "AGAIN" - Bent hand into palm
    if (allFingersCurved) {
      if (handLow && handLeft) {
        return "AGAIN";
      }
    }

    // "BATHROOM" - T hand shaking
    if (fistShape) {
      const thumbBetween = thumbTip.x > indexMCP.x && thumbTip.x < middleMCP.x;
      if (thumbBetween && handMid && handRight) {
        return "BATHROOM";
      }
    }

    // "PLAY" - Y hands shaking
    if (!indexExtended && !middleExtended && !ringExtended && pinkyExtended && thumbExtended) {
      if (handMid && !handCentered) {
        return "PLAY";
      }
    }

    return null;
  };

  if (!isActive) {
    return (
      <div className="flex items-center justify-center h-full bg-muted rounded-lg">
        <p className="text-muted-foreground">Camera not active</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Initializing camera...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-destructive/10 rounded-lg z-10">
          <p className="text-destructive">{error}</p>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="hidden"
        playsInline
      />
      
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg shadow-[var(--shadow-card)]"
        width={1280}
        height={720}
      />
    </div>
  );
};

export default WebcamCapture;
