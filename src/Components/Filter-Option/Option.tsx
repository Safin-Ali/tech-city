import { AiFillCaretDown } from 'react-icons/ai';
import { GiCheckMark } from 'react-icons/gi';
import React, { useEffect, useRef, useState } from 'react';

type callBackFuncType = React.MouseEvent<HTMLLIElement>

interface Props {
    children: string,
    callBackFunc?: (type: string, e: callBackFuncType | boolean) => void,
    activeValue?: string | null,
    optionList: { label: string, value: string | number }[] | undefined,
    singleOption?: boolean
}
function Option({ children,
    callBackFunc = () => { },
    activeValue,
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
                    callBackFunc(children.toLocaleLowerCase(), !active)
                } else {
                    setActive(!active)
                }
            } }
                className={ `select-option ${!singleOption ? activeValue ? 'select-option-active' : '' : active ? 'select-option-active' : ''}` }
            >
                <div className={`ml-1.5`}>
                    { !activeValue ? children : activeValue }
                </div>
                {
                    !singleOption && <div className={ `pointer-events-none mt-0.5` }>
                        <AiFillCaretDown />
                    </div>
                }
            </div>

            {
                !singleOption && (<div className={ `option-list-template ${active ? 'option-list-template-active' : ''}` }>
                    <ul>
                        {
                            optionList?.map((option, idx) => <li
                                key={ idx }
                                data-value={ option.value }
                                onClick={ (event) => callBackFunc(children.toLocaleLowerCase(),event) }
                                className={ `option-items ${option.value === activeValue && 'option-items-active'}` }>
                                { option.label }
                                <span className={`option-items-checkmark ${ activeValue === option.value ? 'block' : 'hidden'}`}><GiCheckMark className={`text-blue-900`}></GiCheckMark></span>
                            </li>)
                        }
                    </ul>
                </div>)
            }
        </div>
    );
};

Option.defaultProps = {}
export default Option;