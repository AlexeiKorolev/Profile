import React, { useEffect, useRef } from 'react';
import '../style/Landing.css';
import useTypingEffect from '../hooks/Effects';
import HiddenDiv from './HiddenDiv';
import CodeTyping from './CodeTyping';
import LaTeXTyping from './LaTeXTyping';
import { THREASH, phrases, customPhrases, customEquations } from './Constants';

const Landing = () => {
    const titleRef = useRef(null);
    const typedText = useTypingEffect(phrases, 100, 50, 2000);

    return (
        <div className="landing-container">
            <div ref={titleRef} className="title">Alexei Korolev</div>
            <div className="subtitle">{typedText}<span className="cursor">|</span></div>
            <HiddenDiv positionX={30} positionY={30} threshold={THREASH}>
            <LaTeXTyping 
                equation={customEquations[0]}
                typingSpeed={5}
                deletingSpeed={5}
                pauseDuration={2000}
            />
            </HiddenDiv>

            <HiddenDiv positionX={50} positionY={25} threshold={THREASH}>
            <LaTeXTyping 
                equation={customEquations[1]}
                typingSpeed={5}
                deletingSpeed={5}
                pauseDuration={2000}
            />
            </HiddenDiv>  

            <HiddenDiv positionX={50} positionY={70} threshold={THREASH}>
            <LaTeXTyping 
                equation={customEquations[2]}
                typingSpeed={5}
                deletingSpeed={5}
                pauseDuration={2000}
            />
            </HiddenDiv>

            <HiddenDiv positionX={30} positionY={70} threshold={THREASH}>
            <CodeTyping 
                    phrase={customPhrases[0]}
                    language="javascript"
                    typingSpeed={50}
                    deletingSpeed={5}
                    pauseDuration={2000}
                />
            </HiddenDiv>

            <HiddenDiv positionX={80} positionY={40} threshold={THREASH}>
            <CodeTyping 
                    phrase={customPhrases[1]}
                    language="javascript"
                    typingSpeed={50}
                    deletingSpeed={5}
                    pauseDuration={2000}
                />
            </HiddenDiv>
            <HiddenDiv positionX={30} positionY={100} threshold={THREASH}>
            <LaTeXTyping 
                equation={customEquations[3]}
                typingSpeed={5}
                deletingSpeed={5}
                pauseDuration={2000}
            />
            </HiddenDiv>

            <HiddenDiv positionX={90} positionY={125} threshold={THREASH}>
            <LaTeXTyping 
                equation={customEquations[4]}
                typingSpeed={5}
                deletingSpeed={5}
                pauseDuration={2000}
            />
            </HiddenDiv>
            <HiddenDiv positionX={20} positionY={180} threshold={THREASH}>
            <CodeTyping 
                    phrase={customPhrases[1]}
                    language="javascript"
                    typingSpeed={50}
                    deletingSpeed={5}
                    pauseDuration={2000}
                />
            </HiddenDiv>
            <HiddenDiv positionX={80} positionY={280} threshold={THREASH}>
            <CodeTyping 
                    phrase={customPhrases[1]}
                    language="javascript"
                    typingSpeed={50}
                    deletingSpeed={5}
                    pauseDuration={2000}
                />
            </HiddenDiv>
            <div className="shape shape1"></div>
            <div className="shape shape2"></div>
            <div className="shape shape3"></div>
            <div className="shape shape4"></div>
            <div className="shape shape5"></div>
        </div>
    );
};

export default Landing;