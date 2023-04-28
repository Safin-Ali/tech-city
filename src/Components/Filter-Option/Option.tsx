import { AiFillCaretDown } from 'react-icons/ai';
import React, { useEffect, useRef, useState } from 'react';

type callBackFuncType = React.MouseEvent<HTMLLIElement>

interface Props {
    children: string,
    callBackFunc?: (e: callBackFuncType | boolean) => void,
    currentText?: string | null,
    optionList: { label: string, value: string | number }[] | undefined,
    singleOption?: boolean
}
function Option({ children,
    callBackFunc = () => { },
    currentText,
    singleOption = false,
    optionList
}: Props) {

    const [active, setActive] = useState<boolean>(false);

    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!singleOption) {

            function handleClickOutside(event: MouseEvent): void {
                if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
                    return setActive(false);
                };
            }

            document.addEventListener('click', handleClickOutside);

            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [targetRef]);

    return (

        <div className={ `relative` }>
            <div ref={ targetRef } onClick={ () => {
                if (singleOption) {
                    setActive(!active)
                    callBackFunc(!active)
                } else {
                    setActive(!active)
                }
            } }
                className={ `select-option ${!singleOption ? currentText ? 'select-option-active' : '' : active ? 'select-option-active' : ''}` }
            >
                <div>
                    { !currentText ? children : currentText }
                </div>
                <div className={ `pointer-events-none mt-0.5` }>
                    <AiFillCaretDown />
                </div>
            </div>

            {
                !singleOption && (<div className={ `option-list-template ${active ? 'block' : 'hidden'}` }>
                    <ul>
                        {
                            optionList?.map((option, idx) => <li key={ idx } data-value={ option.value } onClick={ callBackFunc } className={ `option-items` }>{ option.label }</li>)
                        }
                    </ul>
                </div>)
            }
        </div>
    );
};

Option.defaultProps = {}
export default Option;