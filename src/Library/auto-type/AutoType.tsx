import { useMemo, useState } from 'react';
import './cursor.css';

interface APIType {
    textArr:string[],
    delay?:number,
    typeSpeed?:number,
    style?:React.CSSProperties,
    className?:string,
    alternate?:boolean,
    onceType?:boolean,
    cursorColor?:string,
    removeSpeed?:number,
}

const AutoType = ({
    textArr,
    delay,
    typeSpeed,
    style,
    className,
    alternate,
    cursorColor,
    onceType,
    removeSpeed
}:APIType) => {

    // index for textArr
    const [arrIndex, setArrIndex] = useState<number>(0);

    // store splited textArr
    const [splitText, setSplitText] = useState<string>('');

    // store typeDirection for alternate API.
    const [direction, setDirection] = useState<boolean>(false);

    /*
        1. main and important functinon.
        2. function decide to how and what way append String to DOM.
        3. accept parameters a string.
    */
    const autoType = async (word:string) => {
        const lettersArr = word.split('');  // return array of all charecters or letters peaces from word params.
        const typedString:unknown = await forwardType(lettersArr);  // return how much string set to the splitTextArr state.

        await delayTime();  // wait for backwardText function calling return promise true and.
        await backwardText(typedString);    // remove all the letters of last appended string.
        if (onceType && textArr.length >= 0 && textArr.length < 3) return;    // validation true. that stop excuting code.

    /*
        If alternate props is true. that alternate way to type String by Every Word.
    */
        if (direction) {
            if (!arrIndex) {
                setDirection(false);
                return setArrIndex(1)
            }
            return setArrIndex(arrIndex - 1);
        };

        setArrIndex(arrIndex + 1);
    };

    function delayTime() {
        return new Promise(resolve => {
            setTimeout(() => resolve(true), delay! * 1000 || 2000)
        })
    };

    function forwardType(textArr:string[]) {
        return new Promise(resolve => {
            let count = 0;
            const typing = setInterval(() => {
                if (count !== textArr.length) {
                    return setSplitText(prevText => {
                        count++
                        return prevText.concat(textArr[count - 1])
                    });
                };

                clearInterval(typing);
                return resolve(count - 1)
            }, typeSpeed! * 1000 || 100)
        });
    };

    function backwardText(stringLength:any) {
        if (onceType && textArr.length > 0 && textArr.length < 2) return;
        return new Promise(resolve => {
            let count = stringLength;
            const removeStr = setInterval(() => {
                if (count < 0) {
                    clearInterval(removeStr);
                    return resolve(true);
                };

                setSplitText(prevStr => {
                    let remainingStr = [...prevStr];
                    remainingStr.pop()
                    return remainingStr.join('');
                });
                count--
            }, removeSpeed! * 1000 || 150);
        })
    };

    if (onceType && textArr.length >= 0 && textArr.length < 2) {
        cursorColor = 'inherit'
    }

    useMemo(() => {

        if (textArr.length !== arrIndex) {
            autoType(textArr[arrIndex]);
        };

        if (textArr.length === arrIndex) {
            if (alternate && textArr.length > 2) {
                setArrIndex((textArr.length - 1) - 1);
                setDirection(true);
            } else {
                setArrIndex(0);
            }
        };

        return () => { }
    },[arrIndex]);

    return (
        <>
            <span style={style} className={`${className}`}>{splitText}</span>
            <span style={{ backgroundColor: cursorColor || '#292F3D' }} className={`cursor`}></span>
        </>
    );
};

AutoType.defaultProps = {
    delay: 0,
    typeSpeed: 0,
    style: {},
    className: '',
    alternate: false,
    onceType: false,
    removeSpeed: 0,
    cursorColor:'',
};

export default AutoType;