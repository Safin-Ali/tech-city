import { AiFillCaretDown } from 'react-icons/ai';
import { GiCheckMark } from 'react-icons/gi';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type callBackFuncType = React.MouseEvent<HTMLLIElement>

interface Props {
    children: string,
    callBackFunc?: (type: string, e: callBackFuncType | boolean, nav?:boolean) => void,
    activeValue?: string | null,
    optionList: { label: string, value: string | number }[] | undefined,
    singleOption?: boolean,
    navigate?: boolean
    navigatePath?: string
}
function Option({ children,
    callBackFunc = () => { },
    activeValue,
    singleOption = false,
    optionList,
    navigate = false,
    navigatePath = ''
}: Props) {

    const [active, setActive] = useState<boolean>(false);

    const targetRef = useRef<HTMLDivElement>(null);

    const handleNavigate = useNavigate()

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

    const setCurrentActive = ():ReactNode => {
        return optionList?.find(opt => activeValue === opt.value)?.label || children;
    };
    const checkCurrentOption = ():boolean => {
        return optionList?.some(opt => activeValue === opt.value) || false;
    };

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
                className={ `select-option ${!singleOption ? activeValue ? checkCurrentOption() ? 'select-option-active' : '' : '' : active ? 'select-option-active' : ''}` }
            >
                <div className={`ml-1.5`}>
                    { !activeValue ? children : setCurrentActive() }
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
                                onClick={ (event) => {
                                    callBackFunc(children.toLocaleLowerCase(),event);
                                    if(navigate) handleNavigate(`${navigatePath}${option.value}`);
                                }}
                                className={ `option-items ${option.value === activeValue && 'option-items-active'}` }
                                >

                                {
                                    option.label
                                }

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