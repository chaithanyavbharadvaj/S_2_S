import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface SignInfo {
  sign: string;
  description: string;
  category: string;
}

const signsData: SignInfo[] = [
  // Numbers
  { sign: "1", description: "Index finger extended, thumb tucked", category: "Numbers" },
  { sign: "2", description: "Index and middle fingers extended and spread apart", category: "Numbers" },
  { sign: "3", description: "Thumb, index, and middle fingers extended", category: "Numbers" },
  { sign: "4", description: "All fingers extended except thumb (thumb across palm)", category: "Numbers" },
  { sign: "5", description: "All fingers and thumb extended and spread (open hand)", category: "Numbers" },
  { sign: "6", description: "Thumb and pinky touching, other fingers extended", category: "Numbers" },
  { sign: "7", description: "Thumb and ring finger touching, others extended", category: "Numbers" },
  { sign: "8", description: "Thumb and middle finger touching, others extended", category: "Numbers" },
  { sign: "9", description: "Thumb and index touching (OK sign), others extended", category: "Numbers" },
  { sign: "10", description: "Thumbs up gesture held high", category: "Numbers" },

  // Greetings
  { sign: "HELLO", description: "Open hand wave, palm forward, hand high on right side", category: "Greetings" },
  { sign: "GOODBYE", description: "Open hand wave, palm forward, hand high on left side", category: "Greetings" },
  { sign: "THANK YOU", description: "Flat hand at chin level, move outward (hand high, centered)", category: "Greetings" },
  { sign: "PLEASE", description: "Open hand with thumb, circular motion on chest (mid, centered)", category: "Greetings" },
  { sign: "SORRY", description: "Fist with thumb up, circular motion on chest (mid, centered)", category: "Greetings" },
  { sign: "EXCUSE ME", description: "Flat hand brushing motion (mid, right side)", category: "Greetings" },
  { sign: "I LOVE YOU", description: "Thumb, index finger, and pinky extended (ILY sign)", category: "Greetings" },
  { sign: "YES", description: "Fist nodding motion (hand high, centered)", category: "Greetings" },
  { sign: "NO", description: "Index and middle fingers snapping to thumb", category: "Greetings" },

  // Actions
  { sign: "HELP", description: "Thumbs up on palm (mid height, not centered)", category: "Actions" },
  { sign: "STOP", description: "Flat hand with palm out, fingers together (mid, left)", category: "Actions" },
  { sign: "GO", description: "Index finger pointing forward (mid, right side)", category: "Actions" },
  { sign: "COME", description: "Index finger beckoning/bending toward you (mid, centered)", category: "Actions" },
  { sign: "WAIT", description: "Open hands, palms facing up (low, centered)", category: "Actions" },
  { sign: "SIT", description: "Two fingers together pointing down (low, centered)", category: "Actions" },
  { sign: "STAND", description: "Two fingers together standing up (mid, left)", category: "Actions" },
  { sign: "WALK", description: "Two fingers spread, walking motion (low position)", category: "Actions" },
  { sign: "RUN", description: "L-shape hand moving forward (low, right)", category: "Actions" },
  { sign: "SLEEP", description: "All fingers curved, hand high and centered (closing over face)", category: "Actions" },
  { sign: "WAKE UP", description: "O-shape opening at eyes (high, left)", category: "Actions" },

  // Food & Drink
  { sign: "EAT", description: "Flat O (thumb and index touching), move to mouth (high, centered)", category: "Food & Drink" },
  { sign: "DRINK", description: "C-shape hand tilting to mouth (high, centered)", category: "Food & Drink" },
  { sign: "WATER", description: "W-hand (3 fingers extended) at chin (high, centered)", category: "Food & Drink" },
  { sign: "MILK", description: "Fist squeezing motion (mid, right)", category: "Food & Drink" },
  { sign: "HUNGRY", description: "C-shape hand moving down chest (mid, centered)", category: "Food & Drink" },
  { sign: "FULL", description: "Flat hand across throat area (high, right)", category: "Food & Drink" },
  { sign: "FOOD", description: "Flat O to mouth (high, right)", category: "Food & Drink" },
  { sign: "BREAKFAST", description: "Eat sign + morning gesture (high position)", category: "Food & Drink" },
  { sign: "LUNCH", description: "L-hand at mouth (high, centered)", category: "Food & Drink" },
  { sign: "DINNER", description: "D-hand at mouth (high position)", category: "Food & Drink" },

  // Feelings
  { sign: "HAPPY", description: "Flat hands brushing upward on chest (mid, right)", category: "Feelings" },
  { sign: "SAD", description: "Hands moving down in front of face (high, centered)", category: "Feelings" },
  { sign: "ANGRY", description: "Claw hand in front of face (high, right)", category: "Feelings" },
  { sign: "SCARED", description: "Fists in front of chest (mid, centered)", category: "Feelings" },
  { sign: "TIRED", description: "Hands drooping on chest (mid, centered)", category: "Feelings" },
  { sign: "SICK", description: "Middle finger extended at forehead (high)", category: "Feelings" },
  { sign: "HURT", description: "Index fingers pointing toward each other (mid, centered)", category: "Feelings" },
  { sign: "LOVE", description: "Fists crossed over chest, thumb up (mid, left)", category: "Feelings" },
  { sign: "EXCITED", description: "Middle fingers flicking up on chest (mid)", category: "Feelings" },
  { sign: "CONFUSED", description: "Claw hands at head (high, left)", category: "Feelings" },
  { sign: "SURPRISED", description: "C-hands at eyes widening (high, right)", category: "Feelings" },

  // People
  { sign: "MOTHER", description: "Open hand with thumb at chin (high, left)", category: "People" },
  { sign: "FATHER", description: "Open hand with thumb at forehead (high, not centered)", category: "People" },
  { sign: "FAMILY", description: "F-hands (thumb+index circle, others up) circling (mid, centered)", category: "People" },
  { sign: "FRIEND", description: "Index fingers hooking together (mid position)", category: "People" },
  { sign: "BABY", description: "Arms cradling motion (low, left)", category: "People" },
  { sign: "BOY", description: "Grabbing cap brim gesture (high, right)", category: "People" },
  { sign: "GIRL", description: "Thumb along jaw (high, left)", category: "People" },
  { sign: "PERSON", description: "P-hands moving down (index+middle down, thumb out)", category: "People" },

  // Places
  { sign: "HOME", description: "Flat O at cheek (high, right)", category: "Places" },
  { sign: "SCHOOL", description: "Clapping motion with flat hands (mid, left)", category: "Places" },
  { sign: "WORK", description: "S-hands (fists) tapping (mid, left)", category: "Places" },
  { sign: "STORE", description: "Flat O hands moving outward (mid, not centered)", category: "Places" },
  { sign: "HOSPITAL", description: "H-hand (index+middle together) drawing cross (mid, right)", category: "Places" },
  { sign: "CHURCH", description: "C-shape on back of hand (low, right)", category: "Places" },

  // Time
  { sign: "NOW", description: "Y-hands (thumb+pinky out) pointing down (low)", category: "Time" },
  { sign: "LATER", description: "L-hand moving forward (mid, centered)", category: "Time" },
  { sign: "TODAY", description: "Y-hands with emphasis (mid, centered)", category: "Time" },
  { sign: "TOMORROW", description: "Thumb on cheek moving forward (high, right)", category: "Time" },
  { sign: "YESTERDAY", description: "Y-hand at cheek moving back (high)", category: "Time" },
  { sign: "MORNING", description: "Arm rising like sun (low, left)", category: "Time" },
  { sign: "NIGHT", description: "Arm setting like sun (low, right)", category: "Time" },

  // Questions
  { sign: "WHAT", description: "Open hands, palms up, shrugging gesture (low, centered)", category: "Questions" },
  { sign: "WHERE", description: "Index finger pointing side to side (mid, left)", category: "Questions" },
  { sign: "WHEN", description: "Index circling motion (mid, right area)", category: "Questions" },
  { sign: "WHO", description: "L-hand at chin (high, not centered)", category: "Questions" },
  { sign: "WHY", description: "Y-hand at forehead (high, centered)", category: "Questions" },
  { sign: "HOW", description: "Fists together rolling (low, centered)", category: "Questions" },

  // Descriptive
  { sign: "GOOD", description: "Flat hand from chin moving out (mid, right)", category: "Descriptive" },
  { sign: "BAD", description: "Flat hand from chin moving down (low, centered)", category: "Descriptive" },
  { sign: "BIG", description: "L-hands spreading apart (mid, left)", category: "Descriptive" },
  { sign: "SMALL", description: "Flat hands close together (mid, centered)", category: "Descriptive" },
  { sign: "HOT", description: "C-hand turning away from mouth (high, left)", category: "Descriptive" },
  { sign: "COLD", description: "Fists shaking/shivering (mid, centered)", category: "Descriptive" },
  { sign: "BEAUTIFUL", description: "Open hand circling face (high, centered)", category: "Descriptive" },
  { sign: "NICE", description: "Flat hand sliding on palm (mid, right area)", category: "Descriptive" },

  // Common Words
  { sign: "MORE", description: "Flat O hands tapping together (mid, centered)", category: "Common" },
  { sign: "WANT", description: "Claw hands pulling toward body (mid, centered)", category: "Common" },
  { sign: "NEED", description: "X-hand (bent index) bending down (low)", category: "Common" },
  { sign: "LIKE", description: "Thumb and middle finger extended from chest (mid)", category: "Common" },
  { sign: "DON'T LIKE", description: "Thumb flicking away from chest (low)", category: "Common" },
  { sign: "KNOW", description: "Flat hand at forehead (high, left)", category: "Common" },
  { sign: "DON'T KNOW", description: "Hand flicking away from forehead (mid, left)", category: "Common" },
  { sign: "LEARN", description: "Picking knowledge from palm to head (high, right)", category: "Common" },
  { sign: "UNDERSTAND", description: "Index flicking up near forehead with thumb up (high)", category: "Common" },
  { sign: "THINK", description: "Index finger at forehead (high, centered)", category: "Common" },
  { sign: "REMEMBER", description: "Thumb from forehead down (high, centered)", category: "Common" },
  { sign: "FORGET", description: "Hand wiping across forehead (high, not centered)", category: "Common" },
  { sign: "AGAIN", description: "Bent hand into palm (low, left)", category: "Common" },
  { sign: "BATHROOM", description: "T-hand (fist with thumb between fingers) shaking (mid, right)", category: "Common" },
  { sign: "PLAY", description: "Y-hands shaking (mid, not centered)", category: "Common" },
];

const categoryColors: Record<string, string> = {
  "Numbers": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Greetings": "bg-green-500/20 text-green-400 border-green-500/30",
  "Actions": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Food & Drink": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Feelings": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "People": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Places": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Time": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "Questions": "bg-red-500/20 text-red-400 border-red-500/30",
  "Descriptive": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "Common": "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

const categories = [
  "Numbers",
  "Greetings", 
  "Actions",
  "Food & Drink",
  "Feelings",
  "People",
  "Places",
  "Time",
  "Questions",
  "Descriptive",
  "Common"
];

const SignsGuide = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">ASL Signs Guide</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {signsData.length} signs supported • Position your hand as described
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryItems = signsData.filter(s => s.category === category);
            if (categoryItems.length === 0) return null;
            
            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={`${categoryColors[category]} border`}>
                    {category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    ({categoryItems.length} signs)
                  </span>
                </div>
                
                <div className="grid gap-2">
                  {categoryItems.map((item) => (
                    <div
                      key={item.sign}
                      className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border/50 hover:bg-card/80 transition-colors"
                    >
                      <div className="min-w-[80px]">
                        <span className="font-bold text-primary text-lg">
                          {item.sign}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SignsGuide;


