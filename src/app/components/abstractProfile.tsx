// src/app/components/abstractProfile.tsx
export function AbstractProfile() {
    return (
      <div className="w-full h-full bg-background">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200">
          <defs>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(100,100,100,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="800" height="200" fill="url(#gridPattern)"/>
          
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 100 100 Q 200 50, 300 100 T 500 100" />
            <path d="M 150 150 Q 250 100, 350 150 T 550 150" />
            <path d="M 200 50 Q 300 0, 400 50 T 600 50" />
          </g>
  
          <g>
            <rect x="50" y="70" width="40" height="40" fill="none" stroke="currentColor" transform="rotate(45, 70, 90)"/>
            <circle cx="70" cy="90" r="15" fill="none" stroke="currentColor"/>
            
            <path d="M 380 60 L 420 60 L 400 30 Z" fill="currentColor" opacity="0.7"/>
            <circle cx="400" cy="90" r="20" fill="currentColor" opacity="0.7"/>
            <path d="M 380 120 Q 400 160, 420 120" fill="none" stroke="currentColor" strokeWidth="2"/>
            
            <path d="M 650 70 Q 680 40, 710 70 T 770 70" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="710" cy="90" r="25" fill="none" stroke="currentColor"/>
            <rect x="690" y="70" width="40" height="40" fill="none" stroke="currentColor" opacity="0.5"/>
          </g>
  
          <g fill="currentColor">
            <circle cx="150" cy="50" r="2"/>
            <circle cx="250" cy="70" r="2"/>
            <circle cx="350" cy="90" r="2"/>
            <circle cx="450" cy="70" r="2"/>
            <circle cx="550" cy="50" r="2"/>
          </g>
  
          <text 
            x="400" 
            y="195" 
            fontFamily="monospace" 
            fontSize="15" 
            fill="currentColor" 
            textAnchor="middle"
          >
            rithy.eth
          </text>
        </svg>
      </div>
    )
  }